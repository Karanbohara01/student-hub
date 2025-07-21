

import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import useAuthStore from '../store/authStore';
import chatService from '../services/chatService';
import { toast } from 'react-hot-toast';
import { FaPaperclip, FaImage, FaVideo, FaFileAlt, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:5001');

const ChatWindow = ({ selectedConvo }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [fileToSend, setFileToSend] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const { userInfo } = useAuthStore();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch message history and join room
  useEffect(() => {
    if (selectedConvo) {
      setFileToSend(null);
      const fetchMessages = async () => {
        try {
          const data = await chatService.getMessages(selectedConvo._id);
          setMessages(data);
        } catch (error) {
          toast.error('Could not fetch messages.', error);
        }
      };
      fetchMessages();
      socket.emit('join_room', { room: selectedConvo._id });
    }
  }, [selectedConvo]);

  // Listen for incoming real-time events
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (data.conversationId === selectedConvo?._id) {
        setMessages((prev) => [...prev, data]);
      }
    };
    const handleUserTyping = (data) => {
      if (data.userId !== userInfo._id) setIsTyping(true);
    };
    const handleUserStoppedTyping = () => setIsTyping(false);

    socket.on('receive_message', handleReceiveMessage);
    socket.on('user_typing', handleUserTyping);
    socket.on('user_stopped_typing', handleUserStoppedTyping);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('user_typing', handleUserTyping);
      socket.off('user_stopped_typing', handleUserStoppedTyping);
    };
  }, [selectedConvo, userInfo._id]);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' && !fileToSend) return;

    let uploadedFileUrl = '';
    let uploadedFileType = '';

    if (fileToSend) {
      try {
        const formData = new FormData();
        formData.append('chatFile', fileToSend);
        const uploadRes = await chatService.uploadChatFile(formData);
        uploadedFileUrl = uploadRes.fileUrl;
        uploadedFileType = fileToSend.type.startsWith('image') ? 'image' :
          fileToSend.type.startsWith('video') ? 'video' : 'file';
      } catch (error) {
        toast.error('File upload failed.', error);
        return;
      }
    }

    const otherParticipant = selectedConvo.participants.find(p => p._id !== userInfo._id);
    const messageData = {
      room: selectedConvo._id,
      conversationId: selectedConvo._id,
      sender: userInfo._id,
      receiver: otherParticipant._id,
      text: newMessage,
      fileUrl: uploadedFileUrl,
      fileType: uploadedFileType,
    };

    socket.emit('send_message', messageData);
    setNewMessage('');
    setFileToSend(null);
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    socket.emit('typing', { room: selectedConvo._id, userId: userInfo._id });
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop_typing', { room: selectedConvo._id });
    }, 1000);
  };

  if (!selectedConvo) return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="text-center p-6 max-w-md">
        <div className="w-24 h-24 mx-auto mb-4 bg-[#6e48aa] rounded-full flex items-center justify-center text-white text-4xl">💬</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Select a conversation</h2>
        <p className="text-gray-600">Choose a chat to start messaging</p>
      </div>
    </div>
  );

  const otherParticipant = selectedConvo.participants.find(p => p._id !== userInfo._id);
  const getFileName = (url) => url.split('/').pop();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header with Duolingo-style rounded corners */}
      <div className="p-4 bg-white rounded-t-3xl shadow-sm flex items-center">
        <Link to={`/profile/${otherParticipant._id}`} className="flex items-center hover:opacity-80">

          <div className="relative">


            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${otherParticipant.profilePicture}`}
              alt="avatar"
              className="w-12 h-12 rounded-full mr-3 border-4 border-[#6e48aa]"
            />

            {isTyping && (
              <div className="absolute -bottom-1 left-9 bg-purple-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                typing...
              </div>

            )}
          </div>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            {otherParticipant.name}
          </h2>
          <p className="text-xs text-gray-500">Active now</p>
        </div>
      </div>

      {/* Messages area with Duolingo-style speech bubbles */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => {
          const isMe = msg.sender._id ? msg.sender._id === userInfo._id : msg.sender === userInfo._id;
          return (
            <div key={index} className={`flex mb-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md rounded-3xl p-4 ${isMe ? 'bg-[#6e48aa] text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-md'}`}>
                {msg.fileUrl && msg.fileType === 'image' && (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${msg.fileUrl}`}
                    alt="Sent content"
                    className="rounded-xl max-w-full cursor-pointer mb-1"
                    onClick={() => window.open(`${import.meta.env.VITE_BACKEND_URL}${msg.fileUrl}`)}
                  />
                )}
                {msg.fileUrl && msg.fileType === 'video' && (
                  <video
                    src={`${import.meta.env.VITE_BACKEND_URL}${msg.fileUrl}`}
                    controls
                    className="rounded-xl max-w-full mb-1"
                  />
                )}
                {msg.fileUrl && msg.fileType === 'file' && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}${msg.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className={`flex items-center gap-2 p-2 rounded-lg ${isMe ? 'bg-purple-700 hover:bg-purple-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                  >
                    <FaFileAlt className={isMe ? 'text-white' : 'text-gray-600'} />
                    <span className={`truncate ${isMe ? 'text-white' : 'text-black'}`}>{getFileName(msg.fileUrl)}</span>
                  </a>
                )}
                {msg.text && (
                  <p className="text-sm" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                    {msg.text}
                  </p>
                )}
                <div className={`text-xs mt-1 text-right ${isMe ? 'text-purple-200' : 'text-gray-500'}`}>
                  {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* File preview with Duolingo-style notification */}
      {
        fileToSend && (
          <div className="mx-4 mb-2 p-3 bg-white rounded-xl shadow-md flex items-center justify-between">
            <div className="flex items-center">
              {fileToSend.type.startsWith('image') ? (
                <FaImage className="text-[#6e48aa] mr-2" />
              ) : fileToSend.type.startsWith('video') ? (
                <FaVideo className="text-[#6e48aa] mr-2" />
              ) : (
                <FaFileAlt className="text-[#6e48aa] mr-2" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-800 truncate max-w-xs">
                  {fileToSend.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(fileToSend.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              onClick={() => setFileToSend(null)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              ×
            </button>
          </div>
        )
      }

      {/* Input area with Duolingo-style rounded input */}
      <div className="p-4 bg-white rounded-b-3xl shadow-sm">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-3 text-gray-500 hover:text-[#6e48aa] rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaPaperclip size={18} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFileToSend(e.target.files[0])}
            className="hidden"
          />

          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleInputChange}
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:bg-white"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          />

          <button
            type="submit"
            disabled={!newMessage.trim() && !fileToSend}
            className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
          >
            <FaArrowUp size={16} />
          </button>
        </form>
      </div>
    </div >
  );
};

export default ChatWindow;