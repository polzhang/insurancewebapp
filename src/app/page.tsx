'use client';

import React, { useState, useCallback } from 'react';
import ChatInterface from './realcomponents/ChatInterface';
import ProfileForm from './realcomponents/ProfileForm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  attachments?: Attachment[];
}

interface Attachment {
  name: string;
  type: string;
  size: number;
  file: File;
}

interface ProfileData {
  // Personal
  age: string;
  gender: string;
  maritalStatus: string;
  dependents: string;
  
  // Employment & Income
  occupation: string;
  employmentStatus: string;
  annualIncome: string;
  employerName: string;
  
  // Health & Lifestyle
  height: string;
  weight: string;
  smokingStatus: string;
  alcoholConsumption: string;
  exerciseFrequency: string;
  
  // Medical
  chronicConditions: string;
  currentMedications: string;
  familyMedicalHistory: string;
  
  // Risk Factors
  drivingRecord: string;
  dangerousHobbies: string;
  travelFrequency: string;
  
  // Financial
  existingInsurance: string;
  monthlyExpenses: string;
  creditScore: string;
}

const initialProfile: ProfileData = {
  // Personal
  age: '', gender: '', maritalStatus: '', dependents: '',
  // Employment & Income
  occupation: '', employmentStatus: '', annualIncome: '', employerName: '',
  // Health & Lifestyle
  height: '', weight: '', smokingStatus: '', alcoholConsumption: '', exerciseFrequency: '',
  // Medical
  chronicConditions: '', currentMedications: '', familyMedicalHistory: '',
  // Risk Factors
  drivingRecord: '', dangerousHobbies: '', travelFrequency: '',
  // Financial
  existingInsurance: '', monthlyExpenses: '', creditScore: ''
};

const AIChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your AI assistant. Fill out your profile to get personalized insurance recommendations and advice." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(initialProfile);

  const sendToBackend = async (message: string, attachments: Attachment[] = []) => {
    try {
      console.log('Sending to backend:', { message, profile, attachments: attachments.length });
      
      const formData = new FormData();
      formData.append('message', message);
      formData.append('profile', JSON.stringify(profile));
      
      // Add files to form data
      attachments.forEach((attachment) => {
        formData.append('files', attachment.file);
      });

      console.log('FormData created, sending request...');

      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);
      return data.response;
    } catch (error) {
      console.error('Error sending to backend:', error);
      return 'Sorry, there was an error connecting to the server. Please try again.';
    }
  };

  const handleSendMessage = useCallback(async (message: string, attachments?: Attachment[]) => {
    // Add user message immediately
    const userMessage: Message = {
      role: 'user',
      content: message,
      attachments: attachments
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Send to backend and get response
    const backendResponse = await sendToBackend(message, attachments || []);
    
    // Add assistant response
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: backendResponse 
    }]);
    
    setIsLoading(false);
  }, [profile]); // Add profile as dependency

  const handleProfileUpdate = useCallback((newProfile: ProfileData) => {
    setProfile(newProfile);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">AI Insurance Assistant</h1>
          <p className="text-muted-foreground">Get personalized insurance recommendations and financial advice</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              profile={profile}
            />
          </div>
          
          <div className="lg:col-span-1">
            <ProfileForm
              profile={profile}
              onProfileUpdate={handleProfileUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbotPage;