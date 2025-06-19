import React from 'react';

// Mock components for demonstration
const ManageGroupModal = ({ receiver, allUsers, activeGroupMembers, activeGroupAdmins, username, addMember, removeMember, assignAdmin, removeAdmin, setShowManageGroup }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Manage Group</h3>
      <p className="text-gray-600 mb-4">Group management features would go here.</p>
      <button 
        onClick={() => setShowManageGroup(false)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
      >
        Close
      </button>
    </div>
  </div>
);

const MessageInput = ({ message, setMessage, handleTyping, sendMessage }) => (
  <div className="p-4 bg-white border-t border-gray-100">
    <div className="flex items-end space-x-3">
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
      </div>
      <button
        onClick={sendMessage}
        className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!message.trim()}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  </div>
);

// Enhanced Icon Components with better styling
const BackIcon = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const GroupIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ChatIcon = ({ className = "h-10 w-10" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const CheckIcon = ({ className = "h-3 w-3" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const MoreIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

// Professional Avatar Component with gradient backgrounds
const ChatAvatar = ({ name, mode, size = "md", status }) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-11 w-11 text-base",
    lg: "h-14 w-14 text-lg",
    xl: "h-16 w-16 text-xl"
  };

  const gradients = [
    "bg-gradient-to-br from-blue-500 to-blue-600",
    "bg-gradient-to-br from-purple-500 to-purple-600", 
    "bg-gradient-to-br from-green-500 to-green-600",
    "bg-gradient-to-br from-orange-500 to-orange-600",
    "bg-gradient-to-br from-pink-500 to-pink-600",
    "bg-gradient-to-br from-indigo-500 to-indigo-600"
  ];

  const getGradient = (name) => {
    if (mode === "group") return "bg-gradient-to-br from-emerald-500 to-teal-600";
    const index = name ? name.charCodeAt(0) % gradients.length : 0;
    return gradients[index];
  };

  return (
    <div className="relative">
      <div className={`${sizeClasses[size]} ${getGradient(name)} rounded-2xl flex items-center justify-center font-semibold text-white shadow-lg ring-2 ring-white`}>
        {mode === "group" ? (
          <GroupIcon className="h-5 w-5" />
        ) : (
          name?.charAt(0)?.toUpperCase()
        )}
      </div>
      {status && (
        <div className="absolute -bottom-0.5 -right-0.5">
          <StatusIndicator isOnline={status} />
        </div>
      )}
    </div>
  );
};

// Enhanced Status Indicator
const StatusIndicator = ({ isOnline }) => (
  <div className={`w-3.5 h-3.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white shadow-sm`} />
);

// Professional Action Button
const ActionButton = ({ onClick, variant = "primary", children, className = "", size = "md" }) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-gray-200",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Enhanced Message Status
const MessageStatus = ({ seen, isMe, timestamp }) => {
  if (!isMe) return null;

  return (
    <div className="flex items-center space-x-1 mt-1">
      <span className="text-xs text-gray-400">
        {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
      <span className="text-gray-400 flex items-center">
        {seen ? (
          <div className="flex">
            <CheckIcon className="text-blue-500" />
            <CheckIcon className="text-blue-500 -ml-1" />
          </div>
        ) : (
          <CheckIcon />
        )}
      </span>
    </div>
  );
};

// Professional Typing Indicator
const TypingIndicator = ({ typingUsers, receiver, mode }) => {
  const getTypingUsers = () => {
    if (mode === "group") {
      return Object.keys(typingUsers).filter(user => typingUsers[user] === receiver);
    }
    return Object.keys(typingUsers).includes(receiver) ? [receiver] : [];
  };

  const typing = getTypingUsers();
  if (typing.length === 0) return null;

  return (
    <div className="px-4 py-2 bg-white/80 backdrop-blur-sm">
      <div className="text-sm text-blue-600 flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <span className="font-medium">
          {typing.join(", ")} {typing.length > 1 ? "are typing" : "is typing"}
        </span>
      </div>
    </div>
  );
};

// Professional Chat Header
const ChatHeader = ({
  showSidebar,
  setShowSidebar,
  receiver,
  mode,
  activeGroupMembers,
  activeGroupAdmins,
  username,
  typingUsers,
  onlineStatus,
  setShowManageGroup,
  leaveGroup
}) => {
  const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return "Last seen recently";
    const now = new Date();
    const diffMs = now - new Date(lastSeen);
    const diffMin = Math.round(diffMs / 60000);
    if (diffMin < 1) return "Active now";
    if (diffMin < 60) return `Active ${diffMin} min ago`;
    const diffHours = Math.round(diffMin / 60);
    if (diffHours < 24) return `Active ${diffHours}h ago`;
    return `Active ${new Date(lastSeen).toLocaleDateString()}`;
  };

  const getStatusText = () => {
    if (mode === "group") {
      const memberCount = activeGroupMembers?.length || 0;
      const isAdmin = activeGroupAdmins.includes(username);
      return `${memberCount} member${memberCount !== 1 ? 's' : ''}${isAdmin ? ' • You\'re admin' : ''}`;
    }

    if (onlineStatus[receiver]?.isOnline) {
      return "Active now";
    }

    return formatLastSeen(onlineStatus[receiver]?.lastSeen);
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          <button
            onClick={() => setShowSidebar(true)}
            className="md:hidden mr-3 p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <BackIcon className="text-gray-600 h-5 w-5" />
          </button>
          
          <ChatAvatar 
            name={receiver} 
            mode={mode} 
            size="md"
            status={mode !== "group" ? onlineStatus[receiver]?.isOnline : null}
          />
          
          <div className="ml-3 flex-1 min-w-0">
            <div className="font-semibold text-gray-900 truncate text-lg">{receiver}</div>
            <div className="text-sm text-gray-500 truncate">
              {getStatusText()}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {mode === "group" && (
            <>
              {activeGroupAdmins.includes(username) && (
                <ActionButton
                  onClick={() => setShowManageGroup(true)}
                  variant="secondary"
                  size="sm"
                >
                  Manage
                </ActionButton>
              )}
              <ActionButton
                onClick={leaveGroup}
                variant="danger"
                size="sm"
              >
                Leave
              </ActionButton>
            </>
          )}
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <MoreIcon className="text-gray-600" />
          </button>
        </div>
      </div>
      
      <TypingIndicator typingUsers={typingUsers} receiver={receiver} mode={mode} />
    </div>
  );
};

// Professional Message Bubble
const MessageBubble = ({ message, isMe, mode }) => {
  const bubbleClasses = isMe
    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white ml-auto shadow-lg"
    : message.sender === "System"
    ? "bg-amber-50 text-amber-800 mx-auto text-center border border-amber-200 shadow-sm"
    : "bg-white text-gray-800 shadow-md border border-gray-100";

  return (
    <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 ${bubbleClasses} backdrop-blur-sm`}>
      {!isMe && mode === "group" && message.sender !== "System" && (
        <div className="font-semibold text-sm text-blue-600 mb-2">
          {message.sender}
        </div>
      )}
      
      <div className="text-sm leading-relaxed whitespace-pre-wrap">
        {message.message}
      </div>
      
      <MessageStatus 
        seen={message.seen} 
        isMe={isMe} 
        timestamp={message.timestamp}
      />
      
      {mode === "group" && message.seenBy && (
        <div className="text-xs text-gray-400 mt-1">
          Seen by {message.seenBy}
        </div>
      )}
    </div>
  );
};

// Enhanced Messages Container
const MessagesContainer = ({ messages, username, mode, messagesEndRef }) => {
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ChatIcon className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">No messages yet</h3>
          <p className="text-gray-500 leading-relaxed">Start the conversation by sending your first message!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, idx) => {
        const isMe = msg.sender === "You" || msg.sender === username;
        return (
          <div
            key={msg.id || idx}
            className={`flex ${isMe ? "justify-end" : msg.sender === "System" ? "justify-center" : "justify-start"} animate-fade-in`}
          >
            <MessageBubble
              message={msg}
              isMe={isMe}
              mode={mode}
            />
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

// Professional Welcome Screen
const WelcomeScreen = ({ setShowSidebar }) => (
  <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div className="text-center max-w-lg mx-auto p-8">
      <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
        <ChatIcon className="h-14 w-14 text-white" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to ChatPro
      </h1>
      
      <p className="text-gray-600 mb-8 leading-relaxed text-lg">
        Experience seamless communication with advanced features. Select a conversation to start chatting or create a new group.
      </p>
      
      <div className="space-y-3">
        <button
          onClick={() => setShowSidebar(true)}
          className="md:hidden w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          View Conversations
        </button>
        
        <div className="hidden md:flex flex-col items-center text-sm text-gray-500 space-y-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>End-to-end encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Real-time messaging</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main ChatArea Component with professional styling
export default function ChatArea({
  showSidebar,
  setShowSidebar,
  receiver,
  mode,
  messages = [],
  groupMessages = {},
  activeGroupMembers = [],
  activeGroupAdmins = [],
  username = "User",
  typingUsers = {},
  showManageGroup = false,
  setShowManageGroup = () => {},
  leaveGroup = () => {},
  addMember = () => {},
  removeMember = () => {},
  assignAdmin = () => {},
  removeAdmin = () => {},
  allUsers = [],
  message = "",
  setMessage = () => {},
  handleTyping = () => {},
  sendMessage = () => {},
  messagesEndRef = React.createRef(),
  onlineStatus = {},
}) {
  const displayedMessages = mode === "group" ? groupMessages[receiver] || [] : messages;

  return (
    <div className={`${!showSidebar ? "flex" : "hidden"} md:flex flex-col flex-1 bg-gray-50`}>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
      
      {receiver ? (
        <>
          <ChatHeader
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            receiver={receiver}
            mode={mode}
            activeGroupMembers={activeGroupMembers}
            activeGroupAdmins={activeGroupAdmins}
            username={username}
            typingUsers={typingUsers}
            onlineStatus={onlineStatus}
            setShowManageGroup={setShowManageGroup}
            leaveGroup={leaveGroup}
          />

          {showManageGroup && activeGroupAdmins.includes(username) && (
            <ManageGroupModal
              receiver={receiver}
              allUsers={allUsers}
              activeGroupMembers={activeGroupMembers}
              activeGroupAdmins={activeGroupAdmins}
              username={username}
              addMember={addMember}
              removeMember={removeMember}
              assignAdmin={assignAdmin}
              removeAdmin={removeAdmin}
              setShowManageGroup={setShowManageGroup}
            />
          )}

          <div className="flex flex-col flex-1 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 pointer-events-none"></div>
            <MessagesContainer
              messages={displayedMessages}
              username={username}
              mode={mode}
              messagesEndRef={messagesEndRef}
            />
          </div>

          <MessageInput
            message={message}
            setMessage={setMessage}
            handleTyping={handleTyping}
            sendMessage={sendMessage}
          />
        </>
      ) : (
        <WelcomeScreen setShowSidebar={setShowSidebar} />
      )}
    </div>
  );
}
