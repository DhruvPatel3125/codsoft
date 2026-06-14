import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load dotenv from server root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Windows antivirus/proxy SSL inspection can break Node.js HTTPS (UNABLE_TO_VERIFY_LEAF_SIGNATURE).
// Enable only for local development — never in production.
if (process.env.ALLOW_INSECURE_TLS === 'true') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  console.warn('[TLS] ALLOW_INSECURE_TLS is enabled — SSL certificate verification is disabled.');
}

const requiredEnvVars = [
  'GROQ_API_KEY'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn(`[WARNING] Missing environment variables: ${missingEnvVars.join(', ')}`);
  console.warn('[WARNING] The chatbot will fail to respond unless GROQ_API_KEY is configured.');
}

export const config = {
  PORT: process.env.PORT || 3001,
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173'
};
