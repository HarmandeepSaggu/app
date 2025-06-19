import React from 'react';
import { Search, Users, User, MessageCircle, ChevronRight, Crown, Plus, Settings, X } from 'lucide-react';
import CreateGroupModal from "./CreateGroupModal";

export default function Sidebar({
  showSidebar,
  setShowSidebar,
  searchTerm,
  setSearchTerm,
  showCreateGroup,
  setShowCreateGroup,
  groupName,
  setGroupName,
  groupMembers,
  setGroupMembers,
  allUsers,
  groups,
  username,
  unreadCounts,
  onlineStatus,
  selectGroup,
  selectPrivate,
  createGroup,
  receiver,
  mode,
}) {
  const filteredUsers = allUsers.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return "Unknown";
    const now = new Date();
    const diffMs = now - new Date(lastSeen);
    const diffMin = Math.round(diffMs / 60000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.round(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return new Date(lastSeen).toLocaleDateString();
  };

  const ConversationItem = ({ children, isActive, onClick, hasUnread }) => (
    <div
      onClick={onClick}
      className={`relative group px-3 py-2.5 mx-2 my-0.5 rounded-xl cursor-pointer transition-all duration-200 ${
        isActive 
          ? "bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg transform scale-[1.02]" 
          : hasUnread 
            ? "bg-indigo-50 hover:bg-indigo-100 border border-indigo-100" 
            : "hover:bg-gray-50"
      }`}
    >
      {children}
    </div>
  );

  return (
    <div
      className={`${
        showSidebar ? "flex" : "hidden"
      } md:flex flex-col w-full md:w-80 lg:w-[360px] bg-white border-r border-gray-200/80 shadow-xl`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900">Messages</h1>
            <p className="text-xs text-gray-500">{allUsers.length} contacts</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => setShowCreateGroup(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            title="Create Group"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="p-3 bg-white border-b border-gray-100/50">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all duration-200 placeholder:text-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <CreateGroupModal
          groupName={groupName}
          setGroupName={setGroupName}
          groupMembers={groupMembers}
          setGroupMembers={setGroupMembers}
          allUsers={allUsers}
          createGroup={createGroup}
          setShowCreateGroup={setShowCreateGroup}
        />
      )}

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Groups Section */}
        {filteredGroups.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between px-5 py-2 mb-2">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-indigo-600" />
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Groups
                </span>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                {filteredGroups.length}
              </span>
            </div>
            
            {filteredGroups.map((group) => {
              const isActive = receiver === group.name && mode === "group";
              const hasUnread = unreadCounts[group.name] > 0;
              const isAdmin = group.admins.includes(username);
              
              return (
                <ConversationItem
                  key={group.name}
                  isActive={isActive}
                  hasUnread={hasUnread}
                  onClick={() => selectGroup(group)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="relative flex-shrink-0">
                      <div className={`h-11 w-11 ${isActive ? 'bg-white/20' : 'bg-gradient-to-br from-indigo-100 to-purple-100'} rounded-xl flex items-center justify-center shadow-sm`}>
                        <Users className={`h-5 w-5 ${isActive ? 'text-white' : 'text-indigo-600'}`} />
                      </div>
                      {isAdmin && (
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-amber-400 rounded-full flex items-center justify-center shadow-sm">
                          <Crown className="h-2.5 w-2.5 text-amber-800" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className={`font-medium text-sm truncate ${isActive ? 'text-white' : 'text-gray-900'}`}>
                          {group.name}
                        </h3>
                        {hasUnread && (
                          <div className={`flex-shrink-0 h-5 w-5 ${isActive ? 'bg-white/30' : 'bg-indigo-500'} text-white text-xs rounded-full flex items-center justify-center font-semibold`}>
                            {unreadCounts[group.name] > 99 ? '99+' : unreadCounts[group.name]}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                          {group.members.length} member{group.members.length !== 1 ? 's' : ''}
                        </span>
                        {isAdmin && (
                          <span className={`px-1.5 py-0.5 ${isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'} text-xs rounded font-medium`}>
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </ConversationItem>
              );
            })}
          </div>
        )}

        {/* Users Section */}
        {filteredUsers.length > 0 && (
          <div>
            <div className="flex items-center justify-between px-5 py-2 mb-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Direct Messages
                </span>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                {filteredUsers.length}
              </span>
            </div>
            
            {filteredUsers.map((user) => {
              const isActive = receiver === user && mode === "private";
              const hasUnread = unreadCounts[user] > 0;
              const isOnline = onlineStatus[user]?.isOnline;
              
              return (
                <ConversationItem
                  key={user}
                  isActive={isActive}
                  hasUnread={hasUnread}
                  onClick={() => selectPrivate(user)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="relative flex-shrink-0">
                      <div className={`h-11 w-11 ${isActive ? 'bg-white/20' : 'bg-gradient-to-br from-emerald-100 to-blue-100'} rounded-xl flex items-center justify-center shadow-sm font-semibold text-sm`}>
                        <span className={isActive ? 'text-white' : 'text-emerald-700'}>
                          {user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 ${isActive ? 'border-indigo-500' : 'border-white'} shadow-sm ${
                        isOnline ? 'bg-emerald-400' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className={`font-medium text-sm truncate ${isActive ? 'text-white' : 'text-gray-900'}`}>
                          {user}
                        </h3>
                        {hasUnread && (
                          <div className={`flex-shrink-0 h-5 w-5 ${isActive ? 'bg-white/30' : 'bg-red-500'} text-white text-xs rounded-full flex items-center justify-center font-semibold`}>
                            {unreadCounts[user] > 99 ? '99+' : unreadCounts[user]}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <div className={`h-1.5 w-1.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-gray-400'} ${isActive ? 'opacity-80' : ''}`}></div>
                        <span className={`text-xs truncate ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                          {isOnline ? 'Online' : formatLastSeen(onlineStatus[user]?.lastSeen)}
                        </span>
                      </div>
                    </div>
                  </div>
                </ConversationItem>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredUsers.length === 0 && filteredGroups.length === 0 && searchTerm && (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="h-16 w-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Search className="h-7 w-7 text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">No conversations found</h3>
            <p className="text-sm text-gray-500 text-center leading-relaxed">
              Try adjusting your search terms or start a new conversation
            </p>
          </div>
        )}

        {/* No conversations at all */}
        {filteredUsers.length === 0 && filteredGroups.length === 0 && !searchTerm && (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="h-20 w-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircle className="h-9 w-9 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Messages</h3>
            <p className="text-sm text-gray-500 text-center leading-relaxed mb-4">
              Start a conversation or create a group to get started
            </p>
            <button 
              onClick={() => setShowCreateGroup(true)}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Create Group
            </button>
          </div>
        )}
      </div>

      {/* Mobile Back Button */}
      <div className="md:hidden p-3 border-t border-gray-100 bg-gray-50/50">
        <button
          onClick={() => setShowSidebar(false)}
          className="w-full p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Back to Chat</span>
          <ChevronRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
