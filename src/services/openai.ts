// OpenAI API integration for RelationshipGPS
import { ENHANCED_COACH_SYSTEM_PROMPT, ENHANCED_GIFT_SYSTEM_PROMPT, ENHANCED_DATE_SYSTEM_PROMPT } from './enhanced_system_prompt';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || '';
const OPENAI_API_BASE = process.env.REACT_APP_OPENAI_API_BASE || 'https://api.openai.com/v1';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function sendChatMessage(message: string, conversationHistory: Message[] = []): Promise<string> {
  try {
    const messages: Message[] = [
      { role: 'system', content: ENHANCED_COACH_SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Chat error:', error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
}

export async function generateGiftSuggestions(
  recipientName: string,
  occasion: string,
  budget: string,
  recipientProfile?: any
): Promise<string> {
  try {
    const prompt = `Generate 5 specific, purchasable gift suggestions for ${recipientName} for ${occasion} with a budget of ${budget}.

${recipientProfile ? `Recipient profile: ${JSON.stringify(recipientProfile)}` : ''}

For each gift, provide:
1. Gift name
2. Specific price
3. Where to buy (retailer/website)
4. Why it fits (based on love language, interests, or occasion)

Format as a clear, numbered list.`;

    const response = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: ENHANCED_GIFT_SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    throw new Error('Could not generate gift suggestions. Please try again.');
  }
}

export async function generateDatePlan(
  partnerName: string,
  day: string,
  time: string,
  budget: string,
  partnerProfile?: any
): Promise<string> {
  try {
    const prompt = `Plan a thoughtful date for ${partnerName} on ${day} at ${time} with a budget of ${budget}.

${partnerProfile ? `Partner profile: ${JSON.stringify(partnerProfile)}` : ''}

Create a 3-part date plan:
1. Main Activity (something fun and engaging)
2. Dining (restaurant or meal suggestion)
3. Sweet Gesture (a small, meaningful touch)

Make it personalized to their love language and interests. Format clearly with headers for each part.`;

    const response = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: ENHANCED_DATE_SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    throw new Error('Could not generate date plan. Please try again.');
  }
}
