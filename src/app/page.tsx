'use client';

import React, { useState } from 'react';
import ChatInterface from './realcomponents/ChatInterface';
import ProfileForm from './realcomponents/ProfileForm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
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

const AIChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your AI assistant. Fill out your profile to get personalized insurance recommendations and advice." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
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
  });

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I understand. Based on your profile information, I can provide personalized insurance recommendations and advice. What specific help do you need?" 
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">AI Insurance Assistant</h1>
          <p className="text-muted-foreground">Get personalized insurance recommendations and financial advice</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
          
          <div>
            <ProfileForm
              profile={profile}
              onProfileUpdate={setProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbotPage;