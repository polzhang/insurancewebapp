'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit();
    }
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
        {messages.length === 0 ? (
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
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-lg rounded-bl-sm shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-xs text-gray-500">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <div className="px-6 pt-3 pb-3 border-t border-gray-200 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your insurance question here..."
              disabled={isLoading}
              className="h-12 px-4 text-sm resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button 
            type="submit"
            disabled={!inputValue.trim() || isLoading} 
            size="icon"
            className="h-12 w-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-1">
          Press Enter to send • AI responses are for informational purposes only
        </p>
      </div>
    </Card>
  );
};

export default ChatInterface;