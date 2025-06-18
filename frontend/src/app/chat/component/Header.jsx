'use client';

import React from 'react';

// Icon Components with refined styling
const MenuIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const PlusIcon = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const LogoutIcon = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);

const SearchIcon = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const SettingsIcon = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0Z" />
  </svg>
);

// Enhanced User Avatar Component
const UserAvatar = ({ username }) => {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-pink-500 to-pink-600',
      'bg-gradient-to-br from-indigo-500 to-indigo-600',
      'bg-gradient-to-br from-orange-500 to-orange-600',
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  return (
    <div className="flex items-center space-x-3 group">
      <div className={`
        relative w-9 h-9 rounded-xl flex items-center justify-center 
        text-white text-sm font-semibold shadow-lg
        ring-2 ring-white/20 group-hover:ring-white/40
        transition-all duration-200 transform group-hover:scale-105
        ${getAvatarColor(username)}
      `}>
        {getInitials(username)}
        <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <div className="hidden lg:block">
        <span className="font-medium text-white/90 text-sm">{username}</span>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full shadow-sm" />
          <span className="text-white/60 text-xs">Online</span>
        </div>
      </div>
    </div>
  );
};

// Enhanced Action Button Component
const ActionButton = ({ onClick, children, variant = 'default', className = '', tooltip = '' }) => {
  const baseClasses = "relative group inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm";
  
  const variants = {
    default: "p-2.5 text-white/80 hover:text-white hover:bg-white/10 focus:ring-white/30",
    menu: "p-2.5 md:hidden text-white/80 hover:text-white hover:bg-white/10 focus:ring-white/30",
    create: "px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium shadow-lg hover:shadow-xl focus:ring-white/40 border border-white/20 hover:border-white/30",
    logout: "px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-100 font-medium shadow-lg hover:shadow-xl focus:ring-red-400/40 border border-red-400/30 hover:border-red-400/50",
    icon: "p-2.5 text-white/70 hover:text-white hover:bg-white/10 focus:ring-white/30"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      title={tooltip}
    >
      {children}
      {tooltip && (
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {tooltip}
        </div>
      )}
    </button>
  );
};

// Enhanced Logo Component
const Logo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l3 3 3-3h6c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      </div>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-teal-600 shadow-sm" />
    </div>
    <div className="hidden sm:block">
      <h1 className="font-bold text-xl text-white tracking-tight">WhatsChat</h1>
      <p className="text-white/60 text-xs -mt-1">Stay Connected</p>
    </div>
  </div>
);

// Main Header Component
export default function Header({ username, showSidebar, setShowSidebar, setShowCreateGroup, handleLogout }) {
  return (
    <header className="relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white shadow-2xl border-b border-slate-700/50 backdrop-blur-md">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-blue-600/10 to-purple-600/10 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="relative px-4 lg:px-6 py-4 flex justify-between items-center max-w-full">
        {/* Left Section - Menu & Logo */}
        <div className="flex items-center space-x-4">
          {!showSidebar && (
            <ActionButton
              onClick={() => setShowSidebar(true)}
              variant="menu"
              tooltip="Open Menu"
              className="mr-2"
            >
              <MenuIcon />
            </ActionButton>
          )}
          <Logo />
        </div>

        {/* Center Section - Search (hidden on mobile) */}
        <div className="hidden xl:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-4 py-2.5 pl-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
          </div>
        </div>

        {/* Right Section - User & Actions */}
        <div className="flex items-center space-x-2">
          {/* Search icon for mobile */}
          <ActionButton
            variant="icon"
            tooltip="Search"
            className="xl:hidden"
          >
            <SearchIcon />
          </ActionButton>

          {/* Settings */}
          <ActionButton
            variant="icon"
            tooltip="Settings"
            className="hidden md:flex"
          >
            <SettingsIcon />
          </ActionButton>

          {/* Divider */}
          <div className="w-px h-8 bg-white/20 mx-2 hidden lg:block" />

          {/* User Avatar */}
          <UserAvatar username={username} />

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-4">
            <ActionButton
              onClick={() => setShowCreateGroup(prev => !prev)}
              variant="create"
              tooltip="Create New Group"
            >
              <PlusIcon />
              <span className="ml-2 hidden sm:inline text-sm">New</span>
            </ActionButton>

            <ActionButton
              onClick={handleLogout}
              variant="logout"
              tooltip="Sign Out"
            >
              <LogoutIcon />
              <span className="ml-2 hidden lg:inline text-sm">Logout</span>
            </ActionButton>
          </div>
        </div>
      </div>
    </header>
  );
}