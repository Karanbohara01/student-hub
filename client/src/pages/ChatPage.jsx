import { useState, useEffect } from 'react';
import chatService from '../services/chatService';
import { toast } from 'react-hot-toast';
import ConversationList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';
import { useLocation } from 'react-router-dom';

const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await chatService.getConversations();
        setConversations(data);

        // Check if a conversation was passed from another page
        const preselectedId = location.state?.conversationId;
        if (preselectedId) {
          const preselected = data.find(c => c._id === preselectedId);
          if (preselected) {
            setSelectedConvo(preselected);
          }
        }
      } catch (error) {
        toast.error('Could not fetch conversations.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [location.state]);

  if (loading) return <p className="text-center p-10">Loading conversations...</p>;

  return (
    <div className="flex h-[calc(100vh-80px)] border-4 border-black  bg-white overflow-hidden">
      <div className="w-1/3 border-r-4 border-black">
        <ConversationList
          conversations={conversations}
          onSelectConvo={(convo) => setSelectedConvo(convo)}
          selectedConvoId={selectedConvo?._id}
        />
      </div>

      <div className="w-2/3">
        {selectedConvo ? (
          <ChatWindow selectedConvo={selectedConvo} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;