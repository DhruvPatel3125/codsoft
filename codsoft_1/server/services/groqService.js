import Groq from 'groq-sdk';
import { config } from '../config/env.js';

let groqClient = null;

// The base system prompt that guides the persona and sets strict constraints on responses
const getSystemPrompt = (context) => `You are Dhruv Patel's AI Portfolio Assistant, representing Dhruv Patel (Senior Full-Stack Developer & AI Engineer).
Your goal is to answer questions from recruiters, HRs, or collaborators professionally and confidently based ONLY on the portfolio knowledge base provided below.

=== PORTFOLIO KNOWLEDGE BASE ===
${context}
================================

STRICT CONSTRAINTS & RULES:
1. **No Hallucinations**: You must only answer questions using the information directly available in the knowledge base above.
2. **Missing Information**: If the user asks for information that is NOT present in the knowledge base, you MUST respond exactly: "I don't have information about that." Do not attempt to synthesize, extrapolate, or guess answers if they are not in the context.
3. **Out-of-Scope**: If the user asks non-portfolio related questions (e.g. general knowledge, writing code, cooking, math, trivia), you must refuse to answer and state: "I don't have information about that."
4. **Persona**: Be polite, professional, developer-centric, and clear.
5. **Formatting**:
   - Return clear, easy-to-read replies.
   - Use bold text, bullet points, and numbered lists where appropriate.
   - Mention that they can download Dhruv's resume at "/resume/DhruvPatel_Resume.pdf" if they ask about downloading his CV or Resume.
   - Provide his email (dhruvjpatel5@gmail.com) if they ask how to contact him.
   - Keep answers concise and to the point (maximum 2-3 paragraphs or a clean bulleted list).
`;

/**
 * Gets or initializes the Groq client instance.
 * @returns {Groq} Groq client
 */
function getGroqClient() {
  if (groqClient) return groqClient;
  
  if (!config.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured in the server environment (.env).');
  }

  groqClient = new Groq({
    apiKey: config.GROQ_API_KEY
  });
  
  return groqClient;
}

/**
 * Generates chat completion using Groq LLM.
 * @param {string} userMessage - The new user input
 * @param {Array} history - Array of previous chat messages [{ role: 'user'|'bot', content: string }]
 * @param {string} context - The structured portfolio context compiled from JSON files
 * @returns {Promise<string>} The generated chatbot response
 */
export async function generateChatCompletion(userMessage, history = [], context) {
  try {
    const client = getGroqClient();

    // 1. Prepare system instruction
    const systemPrompt = getSystemPrompt(context);

    // 2. Format history into message payload expected by OpenAI/Groq API (roles: system, user, assistant)
    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    // Append history items. Ensure roles map correctly ('bot' or 'assistant' to 'assistant')
    history.forEach(msg => {
      const role = msg.role === 'bot' || msg.role === 'assistant' ? 'assistant' : 'user';
      messages.push({
        role,
        content: msg.content
      });
    });

    // Append the latest user query
    messages.push({
      role: 'user',
      content: userMessage
    });

    // 3. Make API request to Groq Cloud
    // Using llama-3.3-70b-versatile for high reasoning quality and low latency
    const chatCompletion = await client.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2, // Low temperature to minimize creative liberties and stick to context
      max_tokens: 800,
      top_p: 1,
      stream: false
    });

    const reply = chatCompletion.choices[0]?.message?.content;
    
    if (!reply) {
      throw new Error('Received an empty response from Groq completions.');
    }

    return reply.trim();

  } catch (error) {
    console.error('[GroqService] Completion API Error:', error.message || error);
    throw error;
  }
}
