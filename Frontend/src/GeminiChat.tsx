/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from 'react';
import './GeminiChat.css';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const GeminiChat = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');

    // Add user message to chat history
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setChatHistory(prev => [...prev, userMessage]);

    try {
      const isChatSession = prompt.toLowerCase().includes('lets chat');
      const sessionId = isChatSession ? 'session-001' : 'default-session';
      
      // Convert chat history to UIMessage format
      const messages = chatHistory.map(msg => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        parts: [
          {
            type: 'text' as const,
            text: msg.content,
          },
        ],
      }));

      // Add current prompt to messages
      messages.push({
        id: userMessage.id,
        role: 'user' as const,
        parts: [
          {
            type: 'text' as const,
            text: prompt,
          },
        ],
      });

      const res = await fetch('http://localhost:3000/gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          messages,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      // Add assistant response to chat history
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setChatHistory(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(`Error: ${(err as Error).message}`);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  const handleClear = () => {
    setPrompt('');
    setError('');
    setChatHistory([]);
  };

  return (
    <div className="gemini-chat-container">
      <div className="gemini-chat-header">
        <h1>Excel Interview ChatBot</h1>
        <p>Start your Microsoft Excel interview by typing "Hello" or "Start Interview"</p>
      </div>

      {/* Chat History Display */}
      <div className="chat-history">
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {chatHistory.map((message) => (
          <div 
            key={message.id} 
            className={`message-container ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-header">
              <strong>{message.role === 'user' ? 'You' : 'Interviewer'}</strong>
              <span className="timestamp">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Interviewer is thinking...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="gemini-chat-form">
        <div className="input-group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your response here..."
            rows={3}
            className="prompt-input"
            disabled={loading}
          />
        </div>

        <div className="button-group">
          <button 
            type="button" 
            onClick={handleClear}
            className="clear-btn"
            disabled={loading}
          >
            Clear Chat
          </button>
          <button 
            type="submit" 
            disabled={loading || !prompt.trim()}
            className="submit-btn"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeminiChat;