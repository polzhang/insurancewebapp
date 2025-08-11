'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, MessageSquare, Paperclip, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  age: string;
  gender: string;
  maritalStatus: string;
  dependents: string;
  occupation: string;
  employmentStatus: string;
  annualIncome: string;
  employerName: string;
  height: string;
  weight: string;
  smokingStatus: string;
  alcoholConsumption: string;
  exerciseFrequency: string;
  chronicConditions: string;
  currentMedications: string;
  familyMedicalHistory: string;
  drivingRecord: string;
  dangerousHobbies: string;
  travelFrequency: string;
  existingInsurance: string;
  monthlyExpenses: string;
  creditScore: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string, attachments?: Attachment[]) => void;
  isLoading: boolean;
  profile: ProfileData;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesContainerRef.current?.scrollTo({ top: messagesContainerRef.current.scrollHeight });
  }, [messages, isLoading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!inputValue.trim() && !attachments.length) || isLoading) return;
    
    const messageToSend = inputValue.trim();
    const attachmentsToSend = attachments.length ? [...attachments] : undefined;
    
    setInputValue('');
    setAttachments([]);
    
    try {
      await onSendMessage(messageToSend, attachmentsToSend);
    } catch (error) {
      console.error('Error in onSendMessage:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newAttachments = Array.from(files)
      .filter(file => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))
      .map(file => ({ name: file.name, type: file.type, size: file.size, file }));
    
    if (newAttachments.length) setAttachments(prev => [...prev, ...newAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="flex flex-col h-[550px] w-full">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
          <Bot className="w-5 h-5" />
          AI Insurance Assistant
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Ask questions about insurance policies, coverage options, or get personalized recommendations
        </p>
        <div className="border-t border-gray-200 mt-4"></div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto px-6 space-y-4 min-h-0" ref={messagesContainerRef}>
        {!messages.length ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start a Conversation</h3>
            <p className="text-gray-600 max-w-md">
              Ask me anything about insurance coverage, policy recommendations, or help with understanding your options
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] px-4 py-3 rounded-lg shadow-sm ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  {message.attachments?.length && (
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((attachment, idx) => (
                        <div key={idx} className={`flex items-center gap-2 text-xs p-2 rounded ${
                          message.role === 'user' ? 'bg-blue-500' : 'bg-gray-200'
                        }`}>
                          <FileText className="w-3 h-3" />
                          <span className="truncate">{attachment.name}</span>
                          <span className="text-xs opacity-70">({formatFileSize(attachment.size)})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-lg rounded-bl-sm shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[0, 100, 200].map(delay => (
                        <div key={delay} className={`w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-${delay}`}></div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <div className="px-6 pt-2 pb-1 border-t border-gray-200 flex-shrink-0">
        {attachments.length > 0 && (
          <div className="mb-2 space-y-1">
            {attachments.map((attachment, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded text-sm">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="flex-1 truncate">{attachment.name}</span>
                <span className="text-xs text-gray-500">({formatFileSize(attachment.size)})</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                  className="h-6 w-6 p-0 hover:bg-gray-200"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your insurance question here..."
            disabled={isLoading}
            className="flex-1 h-12 px-4 text-sm resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="h-12 w-12 border-gray-300 hover:bg-gray-50"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <Button 
            type="submit"
            disabled={(!inputValue.trim() && !attachments.length) || isLoading} 
            size="icon"
            className="h-12 w-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-1">
          Press Enter to send • Attach PDFs for document analysis • AI responses are for informational purposes only
        </p>
      </div>
    </Card>
  );
};

export default ChatInterface;