"use client";

import { memo, useMemo } from 'react';
import { 
  ArrowLeft, 
  Users, 
  MessageCircle, 
  Check, 
  CheckCheck 
} from 'lucide-react';

// Constants
const CHAT_MODES = {
  DIRECT: 'direct',
  GROUP: 'group'
};

const MESSAGE_TYPES = {
  USER: 'user',
  SYSTEM: 'system'
};

// Utility functions
const formatLastSeen = (lastSeen) => {
  if (!lastSeen) return "Last seen: Unknown";
  
  const now = new Date();
  const diffMs = now - new Date(lastSeen);
  const diffMin = Math.round(diffMs / 60000);
  
  if (diffMin < 1) return "Last seen: Just now";
  if (diffMin < 60) return `Last seen: ${diffMin} min${diffMin === 1 ? "" : "s"} ago`;
  
  const diffHours = Math.round(diffMin / 60);
  if (diffHours < 24) return `Last seen: ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  
  return `Last seen: ${new Date(lastSeen).toLocaleString()}`;
};

const getTypingUsers = (typingUsers, receiver) => {
  return Object.keys(typingUsers).filter(user => typingUsers[user] === receiver);
};

const formatTypingStatus = (users) => {
  const count = users.length;
  if (count === 0) return "";
  
  const userList = users.join(", ");
  return `${userList} ${count > 1 ? "are typing..." : "is typing..."}`;
};

// Sub-components
const ChatHeader = memo(({ 
  mode, 
  receiver, 
  username,
  activeGroupMembers = [],
  activeGroupAdmins = [],
  typingUsers = {},
  onlineStatus = {},
  onBackClick,
  onManageGroup,
  onLeaveGroup 
}) => {
  const isGroupMode = mode === CHAT_MODES.GROUP;
  const isUserAdmin = activeGroupAdmins.includes(username);
  const currentTypingUsers = getTypingUsers(typingUsers, receiver);
  
  const userStatus = useMemo(() => {
    if (isGroupMode) {
      return `${activeGroupMembers.length || 0} members${isUserAdmin ? " (Admin)" : ""}`;
    }
    
    if (typingUsers[receiver]) return "Typing...";
    if (onlineStatus[receiver]?.isOnline) return "Online";
    
    return formatLastSeen(onlineStatus[receiver]?.lastSeen);
  }, [isGroupMode, activeGroupMembers.length, isUserAdmin, typingUsers, receiver, onlineStatus]);

  return (
    <header className="bg-white p-4 flex items-center border-b border-gray-200 shadow-sm">
      <button
        onClick={onBackClick}
        className="md:hidden mr-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5 text-gray-600" />
      </button>

      <div className={`
        h-12 w-12 rounded-full flex items-center justify-center mr-4 font-medium text-sm
        ${isGroupMode 
          ? "bg-emerald-100 text-emerald-700" 
          : "bg-blue-100 text-blue-700"
        }
      `}>
        {isGroupMode ? (
          <Users className="h-5 w-5" />
        ) : (
          receiver.charAt(0).toUpperCase()
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="font-semibold text-gray-900 truncate">{receiver}</h2>
        <p className="text-sm text-gray-500 truncate">{userStatus}</p>
        
        {isGroupMode && currentTypingUsers.length > 0 && (
          <p className="text-xs text-emerald-600 truncate">
            {formatTypingStatus(currentTypingUsers)}
          </p>
        )}
      </div>

      {isGroupMode && (
        <div className="flex items-center gap-2 ml-4">
          {isUserAdmin && (
            <button
              onClick={onManageGroup}
              className="px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
            >
              Manage
            </button>
          )}
          <button
            onClick={onLeaveGroup}
            className="px-3 py-1.5 text-sm font-medium bg-red-50 text-red-700 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors"
          >
            Leave
          </button>
        </div>
      )}
    </header>
  );
});

ChatHeader.displayName = 'ChatHeader';

const MessageBubble = memo(({ message, isOwnMessage, isGroupMode, mode }) => {
  const isSystemMessage = message.sender === MESSAGE_TYPES.SYSTEM;
  
  const bubbleClasses = useMemo(() => {
    if (isSystemMessage) {
      return "bg-gray-100 text-gray-600 text-center max-w-xs mx-auto";
    }
    
    return isOwnMessage
      ? "bg-emerald-500 text-white ml-auto"
      : "bg-white text-gray-900 border border-gray-200";
  }, [isOwnMessage, isSystemMessage]);

  const MessageStatus = memo(() => {
    if (!isOwnMessage || isSystemMessage) return null;
    
    return (
      <div className="flex items-center justify-end mt-1">
        <span className="text-xs text-emerald-100 flex items-center gap-0.5">
          {message.seen ? (
            <CheckCheck className="h-3 w-3" />
          ) : (
            <Check className="h-3 w-3" />
          )}
        </span>
      </div>
    );
  });

  MessageStatus.displayName = 'MessageStatus';

  return (
    <div className={`mb-3 flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className={`
        max-w-[85%] sm:max-w-md lg:max-w-lg rounded-2xl px-4 py-2.5 shadow-sm
        ${bubbleClasses}
      `}>
        {!isOwnMessage && isGroupMode && !isSystemMessage && (
          <div className="font-semibold text-xs text-emerald-600 mb-1">
            {message.sender}
          </div>
        )}
        
        <div className="text-sm leading-relaxed">
          {message.message}
        </div>
        
        <MessageStatus />
        
        {isGroupMode && message.seenBy && (
          <div className="text-xs text-gray-400 mt-1">
            Seen by: {message.seenBy}
          </div>
        )}
      </div>
    </div>
  );
});

MessageBubble.displayName = 'MessageBubble';

const MessagesContainer = memo(({ messages, mode, username, messagesEndRef }) => {
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No messages yet
          </h3>
          <p className="text-gray-500 text-sm">
            Start the conversation by sending a message!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-1">
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id || `msg-${index}`}
          message={message}
          isOwnMessage={message.sender === "You" || message.sender === username}
          isGroupMode={mode === CHAT_MODES.GROUP}
          mode={mode}
        />
      ))}
      <div ref={messagesEndRef} className="h-1" />
    </div>
  );
});

MessagesContainer.displayName = 'MessagesContainer';

const EmptyState = memo(({ onShowSidebar }) => (
  <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
    <div className="text-center max-w-md">
      <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <MessageCircle className="h-10 w-10 text-gray-400" />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-700 mb-3">
        Welcome to WhatsChat
      </h2>
      
      <p className="text-gray-500 mb-6 leading-relaxed">
        Select a conversation from the sidebar to start chatting with your friends and groups.
      </p>
      
      <button
        onClick={onShowSidebar}
        className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors md:hidden"
      >
        View Conversations
      </button>
    </div>
  </div>
));

EmptyState.displayName = 'EmptyState';

// Main Component
const ChatArea = memo(({
  mode = CHAT_MODES.DIRECT,
  receiver,
  displayedMessages = [],
  messagesEndRef,
  activeGroupMembers = [],
  activeGroupAdmins = [],
  username,
  typingUsers = {},
  onlineStatus = {},
  setShowSidebar,
  setShowManageGroup,
  leaveGroup,
}) => {
  const hasReceiver = Boolean(receiver);
  
  const handleBackClick = () => {
    setShowSidebar?.(true);
  };

  const handleManageGroup = () => {
    setShowManageGroup?.(true);
  };

  const handleLeaveGroup = () => {
    leaveGroup?.();
  };

  if (!hasReceiver) {
    return (
      <div className={`${!receiver ? "hidden md:flex" : "flex"} flex-col flex-1`}>
        <EmptyState onShowSidebar={handleBackClick} />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-50 h-full">
      <ChatHeader
        mode={mode}
        receiver={receiver}
        username={username}
        activeGroupMembers={activeGroupMembers}
        activeGroupAdmins={activeGroupAdmins}
        typingUsers={typingUsers}
        onlineStatus={onlineStatus}
        onBackClick={handleBackClick}
        onManageGroup={handleManageGroup}
        onLeaveGroup={handleLeaveGroup}
      />
      
      <div 
        className="flex-1 bg-gray-50 overflow-hidden"
        style={{
          backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(
            '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(0,0,0,0.02)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#smallGrid)" /></svg>'
          )}')`
        }}
      >
        <MessagesContainer
          messages={displayedMessages}
          mode={mode}
          username={username}
          messagesEndRef={messagesEndRef}
        />
      </div>
    </div>
  );
});

ChatArea.displayName = 'ChatArea';

export default ChatArea;
