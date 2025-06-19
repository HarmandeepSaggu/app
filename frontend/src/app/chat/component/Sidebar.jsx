"use client";
import React from 'react';
import CreateGroupModal from "./CreateGroupModal";

// Icon Components
const Icons = {
  Search: () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Groups: () => (
    <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Settings: () => (
    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  User: () => (
    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Message: () => (
    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
    </svg>
  )
};

// Utility Functions
const formatLastSeen = (lastSeen) => {
  if (!lastSeen) return "Last seen: Unknown";
  const now = new Date();
  const diffMs = now - new Date(lastSeen);
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.round(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return new Date(lastSeen).toLocaleDateString();
};

// App Header Component
const AppHeader = ({ totalContacts }) => (
  <div className="px-6 py-4 bg-white">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
          <Icons.Message />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-500">{totalContacts} contacts</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
         
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Icons.Settings />
        </button>
      </div>
    </div>
  </div>
);

// Search Component
const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="px-6 pb-4">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icons.Search />
      </div>
      <input
        type="text"
        placeholder="Search conversations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl border-0 
                   focus:outline-none focus:ring-0 focus:bg-white focus:shadow-sm
                   transition-all duration-200 text-sm placeholder-gray-500"
      />
    </div>
  </div>
);

// Section Header Component
const SectionHeader = ({ title, count }) => (
  <div className="px-6 py-3 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Icons.Groups />
      <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
        {title}
      </span>
    </div>
    {count > 0 && (
      <span className="text-sm font-medium text-gray-500">
        {count}
      </span>
    )}
  </div>
);

// Group Avatar Component
const GroupAvatar = ({ groupName, isActive, members }) => {
  return (
    <div className="relative flex-shrink-0">
      <div className="w-12 h-12 bg-gray-200 rounded-full 
                      flex items-center justify-center shadow-sm">
        <Icons.Groups />
      </div>
    </div>
  );
};

// User Avatar Component  
const UserAvatar = ({ user, isOnline }) => {
  const colors = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
    'from-red-500 to-red-600',
    'from-yellow-500 to-yellow-600',
    'from-gray-600 to-gray-700'
  ];
  
  const colorIndex = user.charCodeAt(0) % colors.length;
  const gradientClass = colors[colorIndex];
  
  return (
    <div className="relative flex-shrink-0">
      <div className={`w-12 h-12 bg-gradient-to-br ${gradientClass} rounded-full 
                      flex items-center justify-center text-white font-semibold shadow-sm`}>
        {user.charAt(0).toUpperCase()}
      </div>
      {isOnline !== undefined && (
        <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full
                        ${isOnline ? 'bg-green-400' : 'bg-gray-300'}`}></div>
      )}
    </div>
  );
};

// Conversation Item Component
const ConversationItem = ({ 
  isActive, 
  onClick, 
  avatar, 
  title, 
  subtitle,
  showBorder = true 
}) => (
  <div
    onClick={onClick}
    className={`
      px-6 py-4 cursor-pointer transition-all duration-200
      ${isActive 
        ? 'bg-indigo-500 mx-3 rounded-2xl shadow-sm' 
        : 'hover:bg-gray-50'
      }
    `}
  >
    <div className="flex items-center gap-4">
      {avatar}
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold truncate ${isActive ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        {subtitle && (
          <p className={`text-sm truncate mt-0.5 ${isActive ? 'text-indigo-100' : 'text-gray-500'}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  </div>
);

// Groups Section Component
const GroupsSection = ({ 
  filteredGroups, 
  selectGroup, 
  receiver, 
  mode, 
  username 
}) => {
  if (filteredGroups.length === 0) return null;

  return (
    <div className="mb-6">
      <SectionHeader 
        title="Groups" 
        count={filteredGroups.length}
      />
      <div className="space-y-1">
        {filteredGroups.map((group) => (
          <ConversationItem
            key={group.name}
            isActive={receiver === group.name && mode === "group"}
            onClick={() => selectGroup(group)}
            avatar={<GroupAvatar groupName={group.name} members={group.members} />}
            title={group.name}
            subtitle={`${group.members.length} members${group.admins.includes(username) ? ' • Admin' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

// Users Section Component
const UsersSection = ({ 
  filteredUsers, 
  selectPrivate, 
  receiver, 
  mode, 
  onlineStatus 
}) => {
  if (filteredUsers.length === 0) return null;

  return (
    <div>
      <SectionHeader 
        title="Direct Messages" 
        count={filteredUsers.length}
      />
      <div className="space-y-1">
        {filteredUsers.map((user) => {
          const userStatus = onlineStatus[user];
          const isOnline = userStatus?.isOnline;
          const statusText = isOnline ? "Online" : formatLastSeen(userStatus?.lastSeen);
          
          return (
            <ConversationItem
              key={user}
              isActive={receiver === user && mode === "private"}
              onClick={() => selectPrivate(user)}
              avatar={<UserAvatar user={user} isOnline={isOnline} />}
              title={user}
              subtitle={statusText}
            />
          );
        })}
      </div>
    </div>
  );
};

// Main Sidebar Component
export default function Sidebar({
  showSidebar,
  setShowSidebar,
  searchTerm,
  setSearchTerm,
  filteredUsers,
  filteredGroups,
  selectPrivate,
  selectGroup,
  unreadCounts,
  onlineStatus,
  showCreateGroup,
  setShowCreateGroup,
  groupName,
  setGroupName,
  groupMembers,
  setGroupMembers,
  allUsers,
  createGroup,
  username,
  receiver,
  mode,
}) {
  const totalContacts = filteredUsers.length + filteredGroups.length;

  return (
    <>
      {/* Sidebar Container */}
      <div className={`
        ${showSidebar ? "flex" : "hidden"} md:flex
        flex-col w-full md:w-80 lg:w-96 
        bg-white border-r border-gray-200
        h-full max-h-screen
      `}>
        {/* App Header */}
        <AppHeader totalContacts={totalContacts} />

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Groups Section */}
          <GroupsSection
            filteredGroups={filteredGroups}
            selectGroup={selectGroup}
            receiver={receiver}
            mode={mode}
            username={username}
          />

          {/* Users Section */}
          <UsersSection
            filteredUsers={filteredUsers}
            selectPrivate={selectPrivate}
            receiver={receiver}
            mode={mode}
            onlineStatus={onlineStatus}
          />

          {/* Empty State */}
          {filteredUsers.length === 0 && filteredGroups.length === 0 && searchTerm && (
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.Search />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">No results found</h3>
                <p className="text-sm text-gray-500">Try searching for something else</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Back Button */}
        <div className="md:hidden border-t border-gray-200 bg-gray-50 p-4">
          <button
            onClick={() => setShowSidebar(false)}
            className="w-full px-4 py-3 bg-white text-gray-700 rounded-xl border border-gray-200 
                       flex items-center justify-center gap-2 font-medium shadow-sm
                       hover:bg-gray-50 transition-colors duration-200"
          >
            <span>Back to Chat</span>
          </button>
        </div>
      </div>

      {/* Create Group Modal */}
      <CreateGroupModal
        showCreateGroup={showCreateGroup}
        setShowCreateGroup={setShowCreateGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        groupMembers={groupMembers}
        setGroupMembers={setGroupMembers}
        allUsers={allUsers}
        createGroup={createGroup}
      />
    </>
  );
};
