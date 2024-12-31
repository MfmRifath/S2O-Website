import React, { useState } from 'react';
import axios from 'axios';

// Chat Bubble component for displaying messages
const ChatBubble: React.FC<{ message: string; isUser: boolean }> = ({ message, isUser }) => {
  return (
    <div className={`max-w-[80%] p-3 mb-3 rounded-xl ${isUser ? 'bg-green-500 text-white self-end' : 'bg-gray-200 text-black self-start'} break-words`}>
      {message}
    </div>
  );
};

const OpenAiIntegration: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // To store the user input
  const [messages, setMessages] = useState<{ text: string, isUser: boolean }[]>([]); // To store the chat messages
  const [loading, setLoading] = useState<boolean>(false); // To show a loading state

  // Handle form submission and interact with backend
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Add user message to the chat
    setMessages(prevMessages => [...prevMessages, { text: query, isUser: true }]);
    setLoading(true); // Set loading to true when making the request
    setQuery(''); // Clear the input field

    try {
      // Send the query to Spring Boot backend
      const res = await axios.post('http://localhost:8080/api/openai', {
        query: query
      });

      // Add assistant response to the chat
      setMessages(prevMessages => [...prevMessages, { text: res.data.response, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Error occurred while processing the request.', isUser: false }]);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <div className="flex flex-col justify-end h-[80vh] max-w-2xl mx-auto bg-gray-100 rounded-lg p-6 overflow-y-auto">
      <h1 className="text-center text-2xl font-semibold mb-6">OpenAI Chat</h1>

      <div className="flex-1 overflow-y-auto flex flex-col-reverse gap-3">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex mt-4">
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a message..."
          required
          className="flex-1 p-3 rounded-lg border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button 
          type="submit" 
          disabled={loading} 
          className="ml-3 px-6 py-3 rounded-lg bg-green-500 text-white text-lg font-semibold disabled:bg-gray-400"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>

      {loading && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">
          Typing...
        </div>
      )}
    </div>
  );
};

export default OpenAiIntegration;