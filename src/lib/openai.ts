// lib/openai.ts (or src/lib/openai.ts)
import OpenAI from 'openai';
import { ProfileData } from './types'; // Assuming you create a types file

const SYSTEM_PROMPT = `
You are an AI insurance assistant designed to provide personalized insurance recommendations and evaluations...
... (Your full system prompt here) ...
`;

// Initialize the OpenAI client once.
const client = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: "https://api.sea-lion.ai/v1"
});

// A function to combine all user data into a single prompt for the LLM
function createCombinedPrompt(
  message: string,
  profile: ProfileData,
  fileNames: string[]
): { content: string; profileReceived: boolean; filesReceived: boolean } {
  // Build a summary string of profile data
  const profileSummaryLines: string[] = [];
  for (const [key, value] of Object.entries(profile)) {
    if (value && String(value).trim() !== '') {
      profileSummaryLines.push(`- ${key}: ${value}`);
    }
  }
  const profileSummary = profileSummaryLines.length > 0 ? profileSummaryLines.join('\n') : 'No profile information provided.';
  const profileReceived = profileSummaryLines.length > 0;

  // Summarize uploaded file names
  const filesSummary = fileNames.length > 0
    ? `Uploaded policy documents: ${fileNames.join(', ')}`
    : 'No policy documents uploaded.';
  const filesReceived = fileNames.length > 0;

  // Combine all user info + query into one user message content
  const combinedUserContent = `
User Profile Information:
${profileSummary}

${filesSummary}

User Query:
${message}
  `;

  return {
    content: combinedUserContent.trim(),
    profileReceived,
    filesReceived
  };
}

// Main function to call the LLM API
export async function getLLMResponse(
  message: string,
  profile: ProfileData,
  fileNames: string[]
): Promise<{ content: string; profileReceived: boolean; filesReceived: boolean }> {

  const { content: combinedPrompt, profileReceived, filesReceived } = createCombinedPrompt(message, profile, fileNames);

  const completion = await client.chat.completions.create({
    model: "aisingapore/Gemma-SEA-LION-v3-9B-IT",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: combinedPrompt }
    ]
  });

  const assistantResponse = completion.choices[0].message.content;

  return {
    content: assistantResponse || '',
    profileReceived,
    filesReceived
  };
}