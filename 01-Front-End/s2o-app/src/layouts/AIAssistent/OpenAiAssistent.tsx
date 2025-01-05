import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// Chat Bubble component for displaying messages
const ChatBubble: React.FC<{ message: string; isUser: boolean }> = ({ message, isUser }) => {
  return (
    <div
      className={`max-w-[80%] p-4 mb-3 rounded-xl ${isUser ? 'bg-green-500 text-white self-end' : 'bg-gray-200 text-black self-start'} break-words shadow-xl transform transition-all ease-in-out duration-300 ${isUser ? 'animate-fadeInRight' : 'animate-fadeInLeft'}`}
    >
      {message}
    </div>
  );
};

const OpenAiIntegration: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // To store the user input
  const [messages, setMessages] = useState<{ text: string, isUser: boolean }[]>([]); // To store the chat messages
  const [loading, setLoading] = useState<boolean>(false); // To show a loading state
  const bottomRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle form submission and interact with backend
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Add user message to the chat
    setMessages(prevMessages => [...prevMessages, { text: query, isUser: true }]);
    setLoading(true); // Set loading to true when making the request
    setQuery(''); // Clear the input field

    try {
      // Send the query to Spring Boot backend
      const res = await axios.post('http://localhost:8080/api/openai', { query });

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
    <div className="flex flex-col justify-end h-[80vh] max-w-2xl mx-auto bg-white rounded-lg p-6 overflow-hidden shadow-lg">
      <h1 className="text-center text-3xl font-semibold mb-6 text-gray-700">OpenAI Chat</h1>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-4">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
        ))}
        <div ref={bottomRef} /> {/* Element to scroll into view */}
      </div>

      <form onSubmit={handleSubmit} className="flex mt-4 gap-3">
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a message..."
          required
          className="flex-1 p-4 rounded-lg border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-full bg-green-500 text-white text-lg font-semibold shadow-lg disabled:bg-gray-400 transition-all duration-300 hover:bg-green-600"
        >
          {loading ? (
            <div className="animate-spin border-4 border-t-4 border-white w-6 h-6 rounded-full"></div>
          ) : (
            'Send'
          )}
        </button>
      </form>

      {loading && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm animate-pulse">
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-pulse mr-2"></div>
            <span>Assistant is typing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenAiIntegration;