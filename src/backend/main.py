from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json

app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Profile model matching your React component
class ProfileData(BaseModel):
    age: str = ""
    gender: str = ""
    maritalStatus: str = ""
    dependents: str = ""
    occupation: str = ""
    employmentStatus: str = ""
    annualIncome: str = ""
    employerName: str = ""
    height: str = ""
    weight: str = ""
    smokingStatus: str = ""
    alcoholConsumption: str = ""
    exerciseFrequency: str = ""
    chronicConditions: str = ""
    currentMedications: str = ""
    familyMedicalHistory: str = ""
    drivingRecord: str = ""
    dangerousHobbies: str = ""
    travelFrequency: str = ""
    existingInsurance: str = ""
    monthlyExpenses: str = ""
    creditScore: str = ""

@app.get("/")
def read_root():
    return {"message": "Insurance Assistant API is running"}

@app.post("/chat")
async def chat_endpoint(
    message: str = Form(...),
    profile: str = Form(...),
    files: List[UploadFile] = File(default=[])
):
    print("\n" + "="*50)
    print("RECEIVED REQUEST:")
    print("="*50)
    
    # Print message
    print(f"MESSAGE: {message}")
    
    # Parse and print profile JSON
    try:
        profile_data = json.loads(profile)
        print(f"PROFILE DATA:")
        for key, value in profile_data.items():
            if value:  # Only print non-empty values
                print(f"  {key}: {value}")
    except Exception as e:
        print(f"PROFILE PARSING ERROR: {e}")
        profile_data = {}
    
    # Process and print files
    file_info = []
    if files:
        print(f"FILES RECEIVED: {len(files)}")
        for i, file in enumerate(files):
            content = await file.read()
            file_info.append({
                "filename": file.filename,
                "size": len(content),
                "content_type": file.content_type
            })
            print(f"  File {i+1}: {file.filename} ({len(content)} bytes, {file.content_type})")
    else:
        print("FILES: None")
    
    print("="*50)
    print()
    
    # Simple response
    response = f"Received message: '{message}'"
    if profile_data.get('age'):
        response += f" | Age: {profile_data['age']}"
    if file_info:
        response += f" | Files: {len(file_info)} uploaded"
    
    return {
        "response": response,
        "profile_received": bool(profile_data),
        "files_received": len(file_info)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)