import { getFormattedKnowledge } from '../services/knowledgeLoader.js';
import { generateChatCompletion } from '../services/groqService.js';

/**
 * Controller to handle chatbot questions.
 * POST /api/chat
 */
export async function handleChat(req, res) {
  try {
    const { message, history } = req.body;

    // 1. Validation
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message must be a non-empty string.' });
    }

    if (message.trim().length > 500) {
      return res.status(400).json({ error: 'Message exceeds the maximum length of 500 characters.' });
    }

    const cleanedMessage = message.trim();
    const chatHistory = Array.isArray(history) ? history : [];

    console.log(`[ChatController] Processing message: "${cleanedMessage.substring(0, 50)}..."`);
    const startTime = Date.now();

    // 2. Fetch context and generate reply from Groq
    const context = getFormattedKnowledge();
    const reply = await generateChatCompletion(cleanedMessage, chatHistory, context);

    const duration = Date.now() - startTime;
    console.log(`[ChatController] Completed chat completion in ${duration}ms.`);

    // 3. Generate suggestion chips based on the output to support frontend UI
    const suggestions = generateSuggestions(reply);

    // 4. Return successful response
    return res.json({
      reply,
      suggestions
    });

  } catch (error) {
    console.error('[ChatController] Error processing request:', error);
    
    // Provide clean user-facing errors
    const errorMessage = error.message || '';
    if (errorMessage.includes('apiKey') || errorMessage.includes('GROQ_API_KEY')) {
      return res.status(500).json({
        error: 'Backend is misconfigured. Groq API Key is missing.',
        reply: 'Oops! The AI backend seems to be missing its API key configuration. Please set GROQ_API_KEY in the server .env file.'
      });
    }

    return res.status(500).json({
      error: 'Failed to process chat message.',
      reply: 'Sorry, I encountered an internal server error while preparing your response. Please try again in a few seconds.'
    });
  }
}

/**
 * Helper to dynamically extract user suggestion chips based on response text content
 * @param {string} reply - LLM generated reply
 * @returns {Array<string>} List of suggestion strings
 */
function generateSuggestions(reply) {
  const replyLower = reply.toLowerCase();
  const suggestions = [];

  // Generate context-rich follow ups
  if (replyLower.includes("don't have information about that") || replyLower.includes("no information")) {
    suggestions.push("What projects has Dhruv built?", "What are Dhruv's skills?", "How can I contact Dhruv?");
  } else if (replyLower.includes("project") || replyLower.includes("staylix") || replyLower.includes("syshop")) {
    suggestions.push("Tell me about his work experience", "What is his core tech stack?", "Can I download his CV?");
  } else if (replyLower.includes("skill") || replyLower.includes("frontend") || replyLower.includes("backend")) {
    suggestions.push("Tell me about Staylix project", "What did he study?", "How can I contact him?");
  } else if (replyLower.includes("experience") || replyLower.includes("planicsdev") || replyLower.includes("webito")) {
    suggestions.push("What side projects did he build?", "Where did he study?", "How to email him?");
  } else {
    // Standard default suggestions
    suggestions.push("What are his skills?", "Tell me about his projects", "How to reach him?");
  }

  // Deduplicate and return max 3 suggestions
  return [...new Set(suggestions)].slice(0, 3);
}
