import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, AgentName } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Send, Bot, User, Heart, Gift, Calendar, Users } from 'lucide-react';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string, agent?: AgentName) => void;
  isLoading: boolean;
  selectedAgent?: AgentName;
  onAgentSelect: (agent: AgentName) => void;
}

const agents = [
  {
    name: 'Sam' as AgentName,
    title: 'The Orchestrator',
    description: 'Your relationship expert and family coordinator',
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    name: 'Gaia' as AgentName,
    title: 'Gift Concierge',
    description: 'Personalized gift recommendations and shopping intelligence',
    icon: Gift,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'Atlas' as AgentName,
    title: 'Profile Navigator',
    description: 'Family member insights and relationship mapping',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
  selectedAgent = 'Sam',
  onAgentSelect
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage.trim(), selectedAgent);
      setInputMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getAgentInfo = (agentName?: AgentName) => {
    return agents.find(agent => agent.name === agentName) || agents[0];
  };

  const selectedAgentInfo = getAgentInfo(selectedAgent);

  return (
    <div className="flex flex-col h-full max-h-[800px]">
      {/* Agent Selector */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            Choose Your AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {agents.map((agent) => {
              const Icon = agent.icon;
              const isSelected = selectedAgent === agent.name;
              
              return (
                <button
                  key={agent.name}
                  onClick={() => onAgentSelect(agent.name)}
                  className={`p-3 rounded-brand border-2 transition-all text-left ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-secondary-200 hover:border-primary-300 hover:bg-primary-25'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${agent.bgColor}`}>
                      <Icon className={`h-5 w-5 ${agent.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium ${
                        isSelected ? 'text-primary-900' : 'text-text-primary'
                      }`}>
                        {agent.name}
                      </h3>
                      <p className="text-sm text-text-muted font-medium">
                        {agent.title}
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        {agent.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center">
            <selectedAgentInfo.icon className={`h-5 w-5 mr-2 ${selectedAgentInfo.color}`} />
            Chat with {selectedAgentInfo.name}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <selectedAgentInfo.icon className={`h-12 w-12 mx-auto mb-4 ${selectedAgentInfo.color}`} />
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  Start a conversation with {selectedAgentInfo.name}
                </h3>
                <p className="text-text-muted max-w-md mx-auto">
                  {selectedAgentInfo.description}. Ask me anything about your family relationships!
                </p>
                
                {/* Suggested Questions */}
                <div className="mt-6 space-y-2">
                  <p className="text-sm font-medium text-text-secondary">Try asking:</p>
                  <div className="space-y-2">
                    {selectedAgent === 'Sam' && (
                      <>
                        <button
                          onClick={() => setInputMessage("Tell me about my family members")}
                          className="block w-full text-left px-3 py-2 text-sm bg-primary-50 hover:bg-primary-100 rounded-brand text-primary-700 transition-colors"
                        >
                          "Tell me about my family members"
                        </button>
                        <button
                          onClick={() => setInputMessage("Help me plan something special for Laurie")}
                          className="block w-full text-left px-3 py-2 text-sm bg-primary-50 hover:bg-primary-100 rounded-brand text-primary-700 transition-colors"
                        >
                          "Help me plan something special for Laurie"
                        </button>
                      </>
                    )}
                    {selectedAgent === 'Gaia' && (
                      <>
                        <button
                          onClick={() => setInputMessage("I need gift ideas for my wife's birthday")}
                          className="block w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 rounded-brand text-purple-700 transition-colors"
                        >
                          "I need gift ideas for my wife's birthday"
                        </button>
                        <button
                          onClick={() => setInputMessage("What should I get for my granddaughter?")}
                          className="block w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 rounded-brand text-purple-700 transition-colors"
                        >
                          "What should I get for my granddaughter?"
                        </button>
                      </>
                    )}
                    {selectedAgent === 'Atlas' && (
                      <>
                        <button
                          onClick={() => setInputMessage("Show me Laurie's profile and preferences")}
                          className="block w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-brand text-blue-700 transition-colors"
                        >
                          "Show me Laurie's profile and preferences"
                        </button>
                        <button
                          onClick={() => setInputMessage("Who are my grandchildren?")}
                          className="block w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-brand text-blue-700 transition-colors"
                        >
                          "Who are my grandchildren?"
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message) => {
              const isUser = message.role === 'user';
              const agentInfo = getAgentInfo(message.agentName);
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
                      {isUser ? (
                        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className={`h-8 w-8 rounded-full ${agentInfo.bgColor} flex items-center justify-center`}>
                          <agentInfo.icon className={`h-4 w-4 ${agentInfo.color}`} />
                        </div>
                      )}
                    </div>

                    {/* Message Content */}
                    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          isUser
                            ? 'bg-primary-600 text-white'
                            : 'bg-secondary-100 text-text-primary'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <span className="text-xs text-text-muted mt-1">
                        {formatTimestamp(message.timestamp)}
                        {!isUser && message.agentName && (
                          <span className="ml-1">• {message.agentName}</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%]">
                  <div className="mr-3">
                    <div className={`h-8 w-8 rounded-full ${selectedAgentInfo.bgColor} flex items-center justify-center`}>
                      <selectedAgentInfo.icon className={`h-4 w-4 ${selectedAgentInfo.color}`} />
                    </div>
                  </div>
                  <div className="bg-secondary-100 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-secondary-200 p-4">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask ${selectedAgentInfo.name} anything about your family...`}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="md"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
