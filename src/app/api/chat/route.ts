// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getLLMResponse } from '../../../lib/openai';
import { ProfileData } from '../../../lib/types'; 

// This function handles POST requests to /api/chat
export async function POST(req: NextRequest) {
  try {
    // 1. Parse incoming FormData
    const formData = await req.formData();
    const message = formData.get('message')?.toString() || '';
    const profileString = formData.get('profile')?.toString() || '{}';
    const files = formData.getAll('files');

    // 2. Safely parse the profile JSON
    let profileData: ProfileData = {} as ProfileData;
    try {
      profileData = JSON.parse(profileString);
    } catch (error) {
      console.error('Failed to parse profile JSON:', error);
    }

    // 3. Call the core LLM logic
    // The 'files' array contains objects like { name: string, size: number, type: string, arrayBuffer: () => Promise<ArrayBuffer> }
    const fileNames = files
      .filter((file): file is File => typeof file !== 'string' && 'name' in file)
      .map((file) => file.name);

    const llmResponse = await getLLMResponse(message, profileData, fileNames);

    // 4. Return the response to the frontend
    return NextResponse.json({
      response: llmResponse.content,
      profile_received: llmResponse.profileReceived,
      files_received: llmResponse.filesReceived,
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ 
      error: 'Sorry, there was an error connecting to the server.' 
    }, { status: 500 });
  }
}