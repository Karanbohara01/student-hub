import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

const ConversationList = ({ conversations, onSelectConvo, selectedConvoId }) => {
  const { userInfo } = useAuthStore();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on('update_online_status', (users) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.off('update_online_status');
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b-4 border-black">
        <h2 className="text-2xl font-bold" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map(convo => {
          const otherParticipant = convo.participants.find(p => p._id !== userInfo._id);
          if (!otherParticipant) return null;

          const isOnline = onlineUsers.includes(otherParticipant._id);
          const isSelected = convo._id === selectedConvoId;

          return (
            <div
              key={convo._id}
              onClick={() => onSelectConvo(convo)}
              className={`flex items-center p-4 border-b-2 border-gray-200 cursor-pointer ${isSelected ? 'bg-purple-100' : 'hover:bg-gray-100'}`}
            >
              <div className="relative mr-4">
                <img src={`${import.meta.env.VITE_BACKEND_URL}${otherParticipant?.profilePicture}`} alt="avatar" className="w-12 h-12 rounded-full border-2 border-black" />


                {isOnline && (
                  <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-purple-500 border-2 border-white"></span>
                )}
              </div>
              <div className="font-bold" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                {otherParticipant.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationList;