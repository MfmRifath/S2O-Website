import React, { useState, useEffect } from 'react';
import './Chat.css';
import ChatMessageModal from '../../Model/ChatMessageModal';



const Chat: React.FC<{ sender: string , reciver: string}> = ({ sender,reciver }) => {
  const [messages, setMessages] = useState<ChatMessageModal[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ChatMessageModal | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      setHttpError(null);

      const baseUrl: string = `http://localhost:8080/api/chatMessages/messages`;

      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();

        const loadedChats: ChatMessageModal[] = responseJson.map((chat: any) => ({
          id: chat.id,
          sender: chat.sender,
          reciver:chat.reciver,
          content: chat.content
        }));

        setMessages(loadedChats);
      } catch (error: any) {
        console.error('Fetch error:', error);
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const submitMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = `http://localhost:8080/api/chatMessages/add/message`;

    if (sender && reciver && content) {
      const chat = {
        sender,
        reciver,
        content: selectedMessage ? `Replying to "${selectedMessage.content}": ${content}` : content
      };

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chat)
      };

      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        setContent('');
        setMessage('');
        setDisplayWarning(false);
        setDisplaySuccess(true);
        setSelectedMessage(null);  // Clear selected message

        // Fetch messages again to update the list with the new message
        const fetchMessages = async () => {
          setIsLoading(true);
          setHttpError(null);

          const baseUrl: string = `http://localhost:8080/api/chatMessages/messages`;

          try {
            const response = await fetch(baseUrl);

            if (!response.ok) {
              throw new Error("Something went wrong!");
            }

            const responseJson = await response.json();

            const loadedChats: ChatMessageModal[] = responseJson.map((chat: any) => ({
              id: chat.id,
              sender: chat.sender,
              reciver:chat.reciver,
              content: chat.content
            }));

            setMessages(loadedChats);
          } catch (error: any) {
            console.error('Fetch error:', error);
            setHttpError(error.message);
          } finally {
            setIsLoading(false);
          }
        };
        fetchMessages();

      } catch (error) {
        console.error('Error submitting message:', error);
        setDisplaySuccess(false);
        setDisplayWarning(true);
      }
    } else {
      setDisplayWarning(true);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender}`} 
            onClick={() => setSelectedMessage(msg)}
            style={{ backgroundColor: selectedMessage && selectedMessage.id === msg.id ? '#e0e0e0' : 'transparent' }}
          >
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      {selectedMessage && (
        <div className="selected-message">
          Replying to: <strong>{selectedMessage.sender}</strong> - {selectedMessage.content}
        </div>
      )}
      <div className="input-container">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={submitMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
