import React, { useState, useMemo } from 'react';

// Icon components for professional look
const Icons = {
  Search: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Close: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  UserPlus: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Crown: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm2.7-2h8.6l.9-5.4-2.1 1.4L12 8l-3.1 2L6.8 8.6L7.7 14z"/>
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
};

// Sleek Tab Component
const TabButton = ({ active, onClick, children, count }) => (
  <button
    onClick={onClick}
    className={`
      relative px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2
      ${active 
        ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
      }
    `}
  >
    {children}
    {count !== undefined && (
      <span className={`
        inline-flex items-center justify-center w-5 h-5 text-xs rounded-full
        ${active ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200 text-gray-600'}
      `}>
        {count}
      </span>
    )}
  </button>
);

// Modern Search Input
const SearchInput = ({ value, onChange, placeholder }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icons.Search />
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
      placeholder={placeholder}
    />
  </div>
);

// Premium Action Button
const ActionButton = ({ onClick, variant = "primary", size = "sm", icon: Icon, children, disabled = false }) => {
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm",
    warning: "bg-amber-500 hover:bg-amber-600 text-white shadow-sm",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600 border border-gray-200",
    outline: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm"
  };

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-lg transition-all duration-200 
        ${variants[variant]} ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer transform hover:scale-105'}
      `}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};

// User Avatar Component
const UserAvatar = ({ username, isOnline = false }) => (
  <div className="relative">
    <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
      {username.charAt(0).toUpperCase()}
    </div>
    {isOnline && (
      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></div>
    )}
  </div>
);

// User Card Component
const UserCard = ({ user, isAdmin, isCurrentUser, actions }) => (
  <div className="group bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-gray-200 transition-all duration-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <UserAvatar username={user} isOnline={Math.random() > 0.5} />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{user}</span>
            {isAdmin && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                <Icons.Crown />
                Admin
              </span>
            )}
            {isCurrentUser && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                You
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">@{user.toLowerCase()}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {actions}
      </div>
    </div>
  </div>
);

// Main Modal Component
export default function ManageGroupModal({
  showManageGroup,
  setShowManageGroup,
  receiver,
  activeGroupMembers,
  activeGroupAdmins,
  username,
  allUsers,
  addMember,
  removeMember,
  assignAdmin,
  removeAdmin,
}) {
  const [activeTab, setActiveTab] = useState('members');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and search logic
  const availableUsers = useMemo(() => {
    return allUsers
      .filter(user => !activeGroupMembers.includes(user))
      .filter(user => user.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [allUsers, activeGroupMembers, searchQuery]);

  const filteredMembers = useMemo(() => {
    return activeGroupMembers
      .filter(member => member.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [activeGroupMembers, searchQuery]);

  if (!showManageGroup || !activeGroupAdmins.includes(username)) {
    return null;
  }

  const renderAvailableUser = (user) => (
    <UserCard
      key={user}
      user={user}
      isAdmin={false}
      isCurrentUser={false}
      actions={
        <ActionButton
          onClick={() => addMember(user)}
          variant="primary"
          size="xs"
          icon={Icons.UserPlus}
        >
          Add
        </ActionButton>
      }
    />
  );

  const renderMember = (member) => {
    const isAdmin = activeGroupAdmins.includes(member);
    const isCurrentUser = member === username;

    const actions = [];

    if (isAdmin && !isCurrentUser) {
      actions.push(
        <ActionButton
          key="demote"
          onClick={() => removeAdmin(member)}
          variant="warning"
          size="xs"
        >
          Demote
        </ActionButton>
      );
    }

    if (!isAdmin) {
      actions.push(
        <ActionButton
          key="promote"
          onClick={() => assignAdmin(member)}
          variant="success"
          size="xs"
          icon={Icons.Shield}
        >
          Promote
        </ActionButton>
      );
    }

    if (!isCurrentUser) {
      actions.push(
        <ActionButton
          key="remove"
          onClick={() => removeMember(member)}
          variant="danger"
          size="xs"
          icon={Icons.Trash}
        >
          Remove
        </ActionButton>
      );
    }

    return (
      <UserCard
        key={member}
        user={member}
        isAdmin={isAdmin}
        isCurrentUser={isCurrentUser}
        actions={actions}
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Premium Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white p-6">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Icons.Users />
              </div>
              <div>
                <h2 className="text-xl font-bold">Group Management</h2>
                <p className="text-indigo-100 text-sm">{receiver}</p>
              </div>
            </div>
            <button
              onClick={() => setShowManageGroup(false)}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
            >
              <Icons.Close />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-100 px-6 pt-4">
          <div className="flex gap-2">
            <TabButton
              active={activeTab === 'members'}
              onClick={() => setActiveTab('members')}
              count={activeGroupMembers.length}
            >
              Current Members
            </TabButton>
            <TabButton
              active={activeTab === 'add'}
              onClick={() => setActiveTab('add')}
              count={availableUsers.length}
            >
              Add Members
            </TabButton>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-6 pb-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Search ${activeTab === 'members' ? 'members' : 'users'}...`}
          />
        </div>

        {/* Content Area */}
        <div className="px-6 pb-6 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {activeTab === 'members' ? (
              filteredMembers.length > 0 ? (
                filteredMembers.map(renderMember)
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icons.Users />
                  </div>
                  <p className="text-gray-500">No members found</p>
                </div>
              )
            ) : (
              availableUsers.length > 0 ? (
                availableUsers.map(renderAvailableUser)
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icons.UserPlus />
                  </div>
                  <p className="text-gray-500">No users available to add</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <Icons.Users />
                {activeGroupMembers.length} members
              </span>
              <span className="flex items-center gap-1">
                <Icons.Crown />
                {activeGroupAdmins.length} admin{activeGroupAdmins.length !== 1 ? 's' : ''}
              </span>
            </div>
            <ActionButton
              onClick={() => setShowManageGroup(false)}
              variant="primary"
              size="md"
            >
              Done
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
