
import React, { useState } from 'react';

// Professional Icon Components
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





const CodeIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);



// Professional User Avatar Component
const UserAvatar = ({ username, status = 'online' }) => {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    offline: 'bg-gray-400'
  };

  return (
    <div className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold ring-2 ring-white/20 shadow-lg group-hover:shadow-xl transition-all duration-200">
          {getInitials(username)}
        </div>
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusColors[status]} rounded-full border-2 border-white dark:border-gray-800 shadow-sm`} />
      </div>
      <div className="hidden lg:block">
        <div className="text-sm font-medium text-gray-900 dark:text-white">{username}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{status}</div>
      </div>
    </div>
  );
};

// Professional Button Component
const ActionButton = ({ onClick, children, variant = 'default', className = '', tooltip = '', badge = null }) => {
  const baseClasses = "relative inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 font-medium";
  
  const variants = {
    default: "p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-gray-300",
    primary: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-blue-500",
    secondary: "px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-300",
    ghost: "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50 focus:ring-gray-300",
    menu: "p-2 md:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-gray-300"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      title={tooltip}
    >
      {children}
     
    </button>
  );
};

// Professional Logo Component
const Logo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
        <CodeIcon className="text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse" />
    </div>
    <div className="hidden sm:block">
      <h1 className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">DevChat</h1>
      <p className="text-gray-500 dark:text-gray-400 text-xs -mt-0.5">Professional Communication</p>
    </div>
  </div>
);

// Main Header Component
export default function Header({
  username = "John Doe",
  showSidebar = false,
  setShowSidebar = () => {},
  setShowCreateGroup = () => {},
  handleLogout = () => {}
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd toggle the dark class on the document
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="px-4 lg:px-6 py-3 flex justify-between items-center max-w-full">
        {/* Left Section - Menu & Logo */}
        <div className="flex items-center space-x-4">
          {!showSidebar && (
            <ActionButton
              onClick={() => setShowSidebar(true)}
              variant="menu"
              tooltip="Open Menu"
            >
              <MenuIcon />
            </ActionButton>
          )}
          <Logo />
        </div>

        {/* Center Section - Search & Status */}
        <div className="hidden lg:flex items-center space-x-6 flex-1 max-w-2xl mx-8">
          <div className="relative flex-1 max-w-md">
            <div className={`relative transition-all duration-200 ${searchFocused ? 'scale-105' : ''}`}>
              <input
                type="text"
                placeholder="Search conversations, users, or groups..."
                className="w-full px-4 py-2.5 pl-10 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>
       
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center space-x-1">
          {/* Mobile Search */}
          <ActionButton
            variant="ghost"
            tooltip="Search"
            className="lg:hidden"
          >
          </ActionButton>

          {/* Notifications */}
          <ActionButton
            variant="ghost"
            tooltip="Notifications"
            badge="3"
          >
            
          </ActionButton>

          {/* Settings */}
          <ActionButton
            variant="ghost"
            tooltip="Settings"
            className="hidden sm:flex"
          >
            
          </ActionButton>

        

          {/* Divider */}
          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-2 hidden md:block" />

          {/* User Avatar */}
          <div className="px-2">
            <UserAvatar username={username} status="online" />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-2">
            <ActionButton
              onClick={() => setShowCreateGroup(prev => !prev)}
              variant="primary"
              tooltip="Create New Group"
            >
              <PlusIcon />
              <span className="ml-2 hidden sm:inline text-sm">New Group</span>
            </ActionButton>

            <ActionButton
              onClick={handleLogout}
              variant="secondary"
              tooltip="Sign Out"
              className="hidden lg:flex"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </ActionButton>
          </div>
        </div>
      </div>
    </header>
  );
}
