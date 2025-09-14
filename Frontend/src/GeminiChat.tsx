/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from 'react';
import './GeminiChat.css';

const GeminiChat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const isChatSession = prompt.toLowerCase().includes('lets chat');
      const res = await fetch('http://localhost:3000/gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          sessionId: isChatSession ? 'session-001' : 'default-session',
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setError(`Error: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setResponse('');
    setError('');
  };

  return (
    <div className="gemini-chat-container">
      <div className="gemini-chat-header">
        <h1>Gemini AI Chat</h1>
        <p>Ask me anything and I'll help you!</p>
      </div>

      {/* New wrapper for scrollable content */}
      <div className="chat-history">
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {response && (
          <div className="response-container">
            <h3>Gemini's Response:</h3>
            <div className="response-content">
              {response}
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Gemini is thinking...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="gemini-chat-form">
        <div className="input-group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your question or prompt here..."
            rows={4}
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
            Clear
          </button>
          <button 
            type="submit" 
            disabled={loading || !prompt.trim()}
            className="submit-btn"
          >
            {loading ? 'Thinking...' : 'Answer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeminiChat;