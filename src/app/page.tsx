'use client';

import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import FileUploadArea from './components/FileUploadArea';
import ProfileForm from './components/ProfileForm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface ProfileData {
  age: string;
  gender: string;
  annualIncome: string;
  occupation: string;
  relationshipStatus: string;
  dependents: string;
  educationLevel: string;
}

const AIChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI life assistant. I can help you with financial planning, career advice, and life decisions. Feel free to upload documents or fill out your profile to get started."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [profile, setProfile] = useState<ProfileData>({
    age: '',
    gender: '',
    annualIncome: '',
    occupation: '',
    relationshipStatus: '',
    dependents: '',
    educationLevel: ''
  });

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I understand you'd like help with that. Based on your profile and uploaded documents, I can provide personalized advice. Could you tell me more about your specific situation?" 
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleFileUpload = (file: File) => {
    const uploadedFile: UploadedFile = {
      name: file.name,
      size: file.size,
      type: file.type
    };
    setUploadedFiles(prev => [...prev, uploadedFile]);
    
    // Add a message about the file upload
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `I've received your file "${file.name}". I'll analyze it to provide better personalized advice. What would you like to know about it?`
    }]);
  };

  const handleFileRemove = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProfileUpdate = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Life Assistant</h1>
          <p className="text-gray-600">Get personalized advice for your financial and life decisions</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 h-[600px]">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
          
          {/* Sidebar with Profile and File Upload */}
          <div className="space-y-6">
            <ProfileForm
              profile={profile}
              onProfileUpdate={handleProfileUpdate}
            />
            
            <FileUploadArea
              uploadedFiles={uploadedFiles}
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbotPage;