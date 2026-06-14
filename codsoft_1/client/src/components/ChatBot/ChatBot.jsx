import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatBot.module.css';

// Simple lightweight custom markdown to HTML parser to support bold, list items, and links
function parseMarkdown(text) {
  if (!text) return '';
  
  let html = text;
  
  // Clean HTML tags first to avoid injection
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
    
  // Bold: **text** -> <strong>text</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Bullet items: * item -> <li>item</li>
  // First group lists
  const lines = html.split('\n');
  let inList = false;
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const itemContent = trimmed.substring(2);
      if (!inList) {
        inList = true;
        return `<ul><li>${itemContent}</li>`;
      }
      return `<li>${itemContent}</li>`;
    } else if (trimmed.match(/^\d+\.\s/)) {
      const itemContent = trimmed.replace(/^\d+\.\s/, '');
      if (!inList) {
        inList = true;
        return `<ol><li>${itemContent}</li>`;
      }
      return `<li>${itemContent}</li>`;
    } else {
      if (inList) {
        inList = false;
        return `</ul>${line}`;
      }
      return line;
    }
  });
  
  if (inList) {
    processedLines.push('</ul>');
  }
  
  html = processedLines.join('\n');
  
  // Links: [text](url) -> <a href="url" target="_blank" rel="noopener noreferrer">text</a>
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #00f2fe; text-decoration: underline;">$1</a>');
  
  // Paragraphs: double newlines to breaks or wrapped
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br />');
  
  return `<p>${html}</p>`;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Hello! 👋 I'm Dhruv's AI Portfolio Assistant.\n\nAsk me anything about his skills, experience, projects, or how to download his resume!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "What are Dhruv's skills?",
    "Tell me about his projects",
    "How can I contact him?"
  ]);

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Toggle chat widget
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Download resume trigger
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/DhruvPatel_Resume.pdf';
    link.download = 'DhruvPatel_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Send message
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setSuggestions([]);
    setIsTyping(true);

    try {
      // Gather chat history (excluding welcome message if wanted, or pass all)
      const history = messages
        .filter(m => m.role !== 'bot' || m.content.indexOf("Hello!") === -1)
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      // Call Express backend endpoint /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();

      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setSuggestions(data.suggestions || []);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: 'Oops! I had trouble connecting to the backend. Please check if the backend server is running on port 3001, or try again later.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setSuggestions(["What are Dhruv's skills?", "Tell me about his projects"]);
    }
  };

  // Handle key press (Enter)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle suggestion chip click
  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        className={`${styles.chatToggle} ${isOpen ? styles.chatToggleActive : ''}`} 
        onClick={toggleChat}
        title="Chat with Dhruv's AI Assistant"
      >
        {isOpen ? (
          <span className={styles.toggleIcon}>
            <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        ) : (
          <span className={styles.toggleIcon}>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="26" width="26" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </span>
        )}
      </button>

      {/* Chat Widget Window */}
      {isOpen && (
        <div className={styles.chatContainer}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.botAvatar}>DP</div>
              <div className={styles.botTitle}>
                <span className={styles.botName}>AI Portfolio Assistant</span>
                <span className={styles.botStatus}>
                  <span className={styles.statusDot}></span> Online
                </span>
              </div>
            </div>
            
            <div className={styles.headerActions}>
              {/* Download Resume Button */}
              <button 
                className={styles.actionBtn} 
                onClick={handleDownloadResume} 
                title="Download Resume PDF"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
              
              {/* Close Button */}
              <button 
                className={styles.actionBtn} 
                onClick={toggleChat} 
                title="Minimize Chat"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages List */}
          <div className={styles.messagesArea}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`${styles.message} ${msg.role === 'user' ? styles.messageUser : styles.messageBot}`}
              >
                <div 
                  className={`${styles.bubble} ${msg.role === 'user' ? styles.bubbleUser : styles.bubbleBot}`}
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
                />
                <span className={styles.messageTime}>{msg.timestamp}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className={`${styles.message} ${styles.messageBot}`}>
                <div className={`${styles.bubble} ${styles.bubbleBot}`}>
                  <div className={styles.typingIndicator}>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Chips */}
          {suggestions.length > 0 && (
            <div className={styles.suggestionsContainer}>
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  className={styles.suggestionChip}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className={styles.chatInputContainer}>
            <div className={styles.chatForm}>
              <input
                type="text"
                className={styles.chatInput}
                placeholder="Ask something about Dhruv..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isTyping}
              />
              <button 
                className={styles.sendBtn} 
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                title="Send Message"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
