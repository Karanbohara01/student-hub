// import { useState, useEffect } from 'react';
// import chatService from '../services/chatService';
// import { toast } from 'react-hot-toast';
// import ConversationList from '../components/ConversationList';
// import ChatWindow from '../components/ChatWindow';
// import { useLocation } from 'react-router-dom';

// const ChatPage = () => {
//   const [conversations, setConversations] = useState([]);
//   const [selectedConvo, setSelectedConvo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const data = await chatService.getConversations();
//         setConversations(data);

//         // Check if a conversation was passed from another page
//         const preselectedId = location.state?.conversationId;
//         if (preselectedId) {
//           const preselected = data.find(c => c._id === preselectedId);
//           if (preselected) {
//             setSelectedConvo(preselected);
//           }
//         }
//       } catch (error) {
//         toast.error('Could not fetch conversations.', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchConversations();
//   }, [location.state]);

//   if (loading) return <p className="text-center p-10">Loading conversations...</p>;

//   return (
//     <div className="flex h-[calc(100vh-80px)] border-4 border-purple-700  bg-white overflow-hidden">
//       <div className="w-1/3 border-r-4 border-purple-700">
//         <ConversationList
//           conversations={conversations}
//           onSelectConvo={(convo) => setSelectedConvo(convo)}
//           selectedConvoId={selectedConvo?._id}
//         />
//       </div>

//       <div className="w-2/3">
//         {selectedConvo ? (
//           <ChatWindow selectedConvo={selectedConvo} />
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-xl text-gray-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//               Select a conversation to start chatting
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-600 font-medium">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-80 bg-white shadow-xl border-r border-slate-200 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-purple-600 to-purple-700">
          <h2 className="text-lg font-semibold text-white">Conversations</h2>
          <p className="text-blue-100 text-sm mt-1">
            {conversations.length} {conversations.length === 1 ? 'chat' : 'chats'}
          </p>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          <ConversationList
            conversations={conversations}
            onSelectConvo={(convo) => setSelectedConvo(convo)}
            selectedConvoId={selectedConvo?._id}
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConvo ? (
          <ChatWindow selectedConvo={selectedConvo} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md px-6">
              {/* Icon */}
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>

              {/* Text */}
              <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                Welcome to Chat
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Select a conversation from the sidebar to start chatting, or create a new conversation to begin.
              </p>

              {/* Subtle accent line */}
              <div className="mt-6 w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;