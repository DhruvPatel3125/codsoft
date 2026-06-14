import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');

// Cache formatted context string in memory to minimize disk reads
let cachedKnowledgeString = null;

/**
 * Loads a JSON file safely.
 * @param {string} fileName - Name of the file in data directory
 * @returns {object|array} Parsed JSON data, or null if error
 */
function loadJsonFile(fileName) {
  try {
    const filePath = path.join(DATA_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`[KnowledgeLoader] File not found: ${filePath}`);
      return null;
    }
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`[KnowledgeLoader] Error reading ${fileName}:`, error.message);
    return null;
  }
}

/**
 * Formats data lists into structured Markdown sections.
 * @returns {string} Compiled Markdown knowledge base
 */
export function getFormattedKnowledge() {
  if (cachedKnowledgeString) {
    return cachedKnowledgeString;
  }

  console.log('[KnowledgeLoader] Compilation of knowledge base started...');
  let compiled = '';

  // 1. Load Profile / Additional Info
  const additional = loadJsonFile('additional.json');
  if (additional && additional.about) {
    const { name, title, summary, email, github, linkedin, portfolio, resumeUrl } = additional.about;
    compiled += `## GENERAL CANDIDATE INFO\n`;
    compiled += `- **Name**: ${name}\n`;
    compiled += `- **Title**: ${title}\n`;
    compiled += `- **Summary**: ${summary}\n`;
    compiled += `- **Email**: ${email}\n`;
    compiled += `- **GitHub**: ${github}\n`;
    compiled += `- **LinkedIn**: ${linkedin}\n`;
    compiled += `- **Portfolio Website**: ${portfolio}\n`;
    compiled += `- **Resume Download URL**: ${resumeUrl}\n\n`;
  }

  // 2. Load Work Experience & Education
  const history = loadJsonFile('history.json');
  if (history && Array.isArray(history)) {
    const experiences = history.filter(item => item.type === 'experience');
    const education = history.filter(item => item.type === 'education');

    if (experiences.length > 0) {
      compiled += `## PROFESSIONAL EXPERIENCE & INTERNSHIPS\n\n`;
      experiences.forEach(exp => {
        compiled += `### Role: ${exp.role}\n`;
        compiled += `- **Organization**: ${exp.organisation}\n`;
        compiled += `- **Duration**: ${exp.startDate} to ${exp.endDate}\n`;
        compiled += `- **Key Responsibilities & Highlights**:\n`;
        if (exp.experiences && Array.isArray(exp.experiences)) {
          exp.experiences.forEach(desc => {
            compiled += `  * ${desc}\n`;
          });
        }
        compiled += `\n`;
      });
    }

    if (education.length > 0) {
      compiled += `## ACADEMIC / EDUCATION HISTORY\n\n`;
      education.forEach(edu => {
        compiled += `### Degree: ${edu.role}\n`;
        compiled += `- **Institution**: ${edu.organisation}\n`;
        compiled += `- **Duration**: ${edu.startDate} to ${edu.endDate}\n`;
        compiled += `- **Academic Accomplishments**:\n`;
        if (edu.experiences && Array.isArray(edu.experiences)) {
          edu.experiences.forEach(desc => {
            compiled += `  * ${desc}\n`;
          });
        }
        compiled += `\n`;
      });
    }
  }

  // 3. Load Technical Skills
  const skills = loadJsonFile('skills.json');
  if (skills && Array.isArray(skills)) {
    compiled += `## TECHNICAL SKILLS & COMPETENCIES\n\n`;
    const categories = {
      languages: 'Programming Languages',
      frontend: 'Frontend Technologies',
      backend: 'Backend & Databases',
      tools: 'Developer Tools & Cloud Services'
    };

    Object.entries(categories).forEach(([key, categoryTitle]) => {
      const filtered = skills.filter(s => s.category === key);
      if (filtered.length > 0) {
        compiled += `### ${categoryTitle}\n`;
        compiled += filtered.map(s => s.title).join(', ') + '\n\n';
      }
    });
  }

  // 4. Load Portfolio Projects
  const projects = loadJsonFile('project.json');
  if (projects && Array.isArray(projects)) {
    compiled += `## PORTFOLIO PROJECTS\n\n`;
    projects.forEach((proj, idx) => {
      compiled += `### Project ${idx + 1}: ${proj.title}\n`;
      compiled += `- **Description**: ${proj.description}\n`;
      compiled += `- **Tech Stack**: ${proj.skills.join(', ')}\n`;
      compiled += `- **Live Link**: ${proj.demo}\n`;
      compiled += `- **Source Code**: ${proj.source}\n`;
      if (proj.highlights && Array.isArray(proj.highlights)) {
        compiled += `- **Key Highlights**:\n`;
        proj.highlights.forEach(h => {
          compiled += `  * ${h}\n`;
        });
      }
      compiled += `\n`;
    });
  }

  // 5. Load Certifications
  if (additional && additional.certifications && Array.isArray(additional.certifications)) {
    compiled += `## CERTIFICATIONS\n\n`;
    additional.certifications.forEach(cert => {
      compiled += `- **Title**: ${cert.title}\n`;
      compiled += `  * **Issuer**: ${cert.issuer}\n`;
      compiled += `  * **Year**: ${cert.year}\n`;
      compiled += `  * **Details**: ${cert.details}\n\n`;
    });
  }

  // Cache compiled markdown context
  cachedKnowledgeString = compiled.trim();
  console.log('[KnowledgeLoader] Knowledge base compiled successfully.');
  
  return cachedKnowledgeString;
}

/**
 * Clears the knowledge cache. Useful if profile data changes dynamically.
 */
export function clearKnowledgeCache() {
  cachedKnowledgeString = null;
}
