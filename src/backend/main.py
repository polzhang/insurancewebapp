import os
import json
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI (SEA-LION compatible) client using your API key from env
client = OpenAI(
    api_key=os.getenv("API_KEY"),  # Your API key env variable is API_KEY
    base_url="https://api.sea-lion.ai/v1"
)

SYSTEM_PROMPT = """
You are an AI insurance assistant designed to provide personalized insurance recommendations and evaluations. You receive three types of inputs:

User queries (questions or requests).

User profile information (demographics, health, financial info).

Uploaded policy documents (PDFs).

Your behavior should adapt according to the presence or absence of these inputs:

If the user profile information (2) is missing or incomplete when the user asks for personalized recommendations or evaluations, prompt the user politely to complete their profile before proceeding.

If the user uploads no policy documents (3) but asks for a policy recommendation, suggest suitable insurance policies from the internal database based solely on their profile data.

If the user requests an evaluation of the suitability of specific insurance policies but has not uploaded any policy documents (3), ask the user kindly to upload their policy files for review.

If the user profile (2) is complete and policy documents (3) are uploaded, provide a thorough evaluation or recommendation based on all available information.

For all other user questions or requests not related to recommendations or evaluations, respond helpfully using general insurance knowledge.

Always be clear, polite, and guide the user on what to do next if information is missing.

Handle edge cases gracefully, for example:

If user asks about something unrelated to insurance, respond politely that you specialize in insurance advice.

If inputs are partially missing, specify exactly what is needed next.

If the user uploads documents but no profile, still ask for profile completion before evaluation
"""

@app.post("/chat")
async def chat_endpoint(
    message: str = Form(...),
    profile: str = Form(...),
    files: List[UploadFile] = File(default=[])
):
    # Parse profile JSON safely
    try:
        profile_data = json.loads(profile)
    except Exception:
        profile_data = {}

    # Build a summary string of profile data (only non-empty fields)
    profile_summary_lines = []
    for k, v in profile_data.items():
        if v and str(v).strip() != "":
            profile_summary_lines.append(f"- {k}: {v}")
    profile_summary = "\n".join(profile_summary_lines) if profile_summary_lines else "No profile information provided."

    # Summarize uploaded file names
    if files:
        file_names = [file.filename for file in files]
        files_summary = f"Uploaded policy documents: {', '.join(file_names)}"
    else:
        files_summary = "No policy documents uploaded."

    # Combine all user info + query into one user message content
    combined_user_content = (
        f"User Profile Information:\n{profile_summary}\n\n"
        f"{files_summary}\n\n"
        f"User Query:\n{message}"
    )

    # Prepare messages array for chat completion
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": combined_user_content}
    ]

    # Call the SEA-LION chat completion endpoint
    completion = client.chat.completions.create(
        model="aisingapore/Gemma-SEA-LION-v3-9B-IT",
        messages=messages
    )

    assistant_response = completion.choices[0].message.content

    return {
        "response": assistant_response,
        "profile_received": bool(profile_summary_lines),
        "files_received": len(files)
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
