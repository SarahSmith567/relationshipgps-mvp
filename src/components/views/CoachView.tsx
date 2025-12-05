import React, { useState } from 'react';
import { sampleChatMessages, ChatMessage } from '../../data/mockData';
import VoiceInputButton from '../shared/VoiceInputButton';
import BackButton from '../shared/BackButton';
import { sendChatMessage } from '../../services/openai';

interface CoachViewProps {
  onBack?: () => void;
}

const CoachView: React.FC<CoachViewProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'I need gift ideas for...',
    'How do I handle conflict about...',
    'What\'s a good date idea for...',
    'I\'m feeling overwhelmed about...',
    'Help me understand attachment styles'
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Convert messages to OpenAI format
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }));

      // Get real AI response from OpenAI
      const aiResponseText = await sendChatMessage(currentInput, conversationHistory);
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date(),
        concepts: getRelatedConcepts(currentInput)
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      // Fallback to mock response if API fails
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('gift')) {
      return 'I\'d be happy to help with gift ideas! To give you the best suggestions, could you tell me: Who is the gift for? What\'s the occasion? And what\'s your budget range?';
    } else if (lowerInput.includes('conflict') || lowerInput.includes('upset') || lowerInput.includes('fight')) {
      return 'I understand that\'s difficult. Conflict in relationships is normal, and it sounds like you want to make things right. Can you tell me what happened? Also, knowing the other person\'s attachment style can help us find the best approach to repair.';
    } else if (lowerInput.includes('date')) {
      return 'I love helping plan meaningful dates! To create the perfect plan, tell me: Who is the date with? When are you thinking? What\'s your budget? And are there any specific interests or preferences I should know about?';
    } else if (lowerInput.includes('overwhelmed') || lowerInput.includes('stressed')) {
      return 'I hear you. Feeling overwhelmed is a sign you\'re carrying a lot. Let\'s break this down together. What specifically is feeling most heavy right now? Sometimes just naming it can help.';
    } else if (lowerInput.includes('attachment')) {
      return 'Attachment styles are patterns we develop in how we connect with others. There are four main types: Secure, Anxious, Avoidant, and Fearful-Avoidant. Each has different needs and triggers. Would you like to learn about a specific attachment style, or explore which one might fit you or someone you care about?';
    } else {
      return 'I\'m here to help with your relationships. I can suggest gifts, plan dates, help with conflict resolution, explain relationship concepts, or just listen. What would be most helpful right now?';
    }
  };

  const getRelatedConcepts = (input: string): Array<{ title: string; brief: string }> | undefined => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('attachment')) {
      return [
        {
          title: 'Attachment Styles',
          brief: 'Patterns of how we connect with others, formed in childhood and affecting adult relationships.'
        }
      ];
    } else if (lowerInput.includes('conflict')) {
      return [
        {
          title: 'Repair Attempts',
          brief: 'Actions taken to de-escalate conflict and reconnect after a disagreement.'
        }
      ];
    }
    return undefined;
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleVoiceInput = (text: string) => {
    setInputValue(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="coach-view">
      <BackButton onClick={() => onBack?.()} />
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <p className="message-text">{message.text}</p>
                {message.concepts && message.concepts.length > 0 && (
                  <div className="concept-cards">
                    {message.concepts.map((concept, idx) => (
                      <div key={idx} className="concept-card">
                        <h4 className="concept-title">{concept.title}</h4>
                        <p className="concept-brief">{concept.brief}</p>
                        <button className="btn-text">Learn More</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          ))}
          
          {isTyping && (
            <div className="message ai">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="quick-prompts">
            <p className="quick-prompts-label">Try asking:</p>
            <div className="quick-prompts-grid">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  className="quick-prompt-button"
                  onClick={() => handleQuickPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chat-input-area">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about relationships..."
            className="chat-input"
          />
          <VoiceInputButton onTranscription={handleVoiceInput} size="medium" />
          <button 
            onClick={handleSendMessage}
            className="btn btn-primary btn-send"
            disabled={!inputValue.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachView;
