// // "use client";
// // import { useEffect, useState, useRef } from "react";
// // import io from "socket.io-client";

// // const socket = io("https://app-backend-1naq.onrender.com");

// // export default function ChatPage() {
// //   const [message, setMessage] = useState("");
// //   const [messages, setMessages] = useState([]);
// //   const [groupMessages, setGroupMessages] = useState({});
// //   const [allUsers, setAllUsers] = useState([]); // New state for all registered users
// //   const [username, setUsername] = useState("");
// //   const [receiver, setReceiver] = useState("");
// //   const [mode, setMode] = useState("private");
// //   const [groupMembers, setGroupMembers] = useState([]);
// //   const [groupName, setGroupName] = useState("");
// //   const [groups, setGroups] = useState([]);
// //   const [activeGroupMembers, setActiveGroupMembers] = useState([]);
// //   const [activeGroupAdmins, setActiveGroupAdmins] = useState([]);
// //   const [showSidebar, setShowSidebar] = useState(true);
// //   const [showCreateGroup, setShowCreateGroup] = useState(false);
// //   const [showManageGroup, setShowManageGroup] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [typingUsers, setTypingUsers] = useState({});
// //   const [unreadCounts, setUnreadCounts] = useState({});
// //   const [onlineStatus, setOnlineStatus] = useState({}); // Tracks online status and last seen
// //   const typingTimeoutRef = useRef(null);
// //   const messagesEndRef = useRef(null);
// //   const viewedMessagesRef = useRef(new Set());

// //   useEffect(() => {
// //     const savedUser = localStorage.getItem("username");
// //     if (!savedUser) return;
// //     setUsername(savedUser);
// //     socket.emit("join", savedUser);
// //   }, []);

// //   // Fetch all registered users
// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const res = await fetch(" https://app-backend-1naq.onrender.com/api/users");
// //         if (!res.ok) throw new Error("Failed to fetch users");
// //         const data = await res.json();
// //         // Filter out the current user
// //         setAllUsers(data.filter((u) => u !== username));
// //       } catch (err) {
// //         console.error("Failed to load users", err);
// //       }
// //     };

// //     if (username) {
// //       fetchUsers();
// //     }
// //   }, [username]);

// //   useEffect(() => {
// //     const fetchGroups = async () => {
// //       try {
// //         const res = await fetch(" https://app-backend-1naq.onrender.com/api/groups");
// //         const data = await res.json();
// //         const userGroups = data.filter((g) => g.members.includes(username));
// //         setGroups(userGroups);
// //       } catch (err) {
// //         console.error("Failed to load groups", err);
// //       }
// //     };

// //     if (username) {
// //       fetchGroups();
// //     }
// //   }, [username]);

// //   // Handle online status and last seen
// //   useEffect(() => {
// //     const handleOnlineStatus = ({ username, isOnline, lastSeen }) => {
// //       setOnlineStatus((prev) => ({
// //         ...prev,
// //         [username]: { isOnline, lastSeen: lastSeen ? new Date(lastSeen) : null },
// //       }));
// //     };
// //     socket.on("online_status", handleOnlineStatus);
// //     return () => socket.off("online_status", handleOnlineStatus);
// //   }, []);

// //   // Update online status based on connected users
// //   useEffect(() => {
// //     const handleUsers = (onlineUsers) => {
// //       setOnlineStatus((prev) => {
// //         const updatedStatus = { ...prev };
// //         // Mark all users as offline by default
// //         allUsers.forEach((user) => {
// //           if (!updatedStatus[user]) {
// //             updatedStatus[user] = { isOnline: false, lastSeen: null };
// //           }
// //           updatedStatus[user].isOnline = onlineUsers.includes(user);
// //         });
// //         return updatedStatus;
// //       });
// //     };
// //     socket.on("users", handleUsers);
// //     return () => socket.off("users", handleUsers);
// //   }, [allUsers]);

// //   useEffect(() => {
// //     const handlePrivate = ({ from, message, timestamp, id, seen }) => {
// //       if (receiver === from && mode === "private") {
// //         setMessages((prev) => [...prev, { sender: from, message, timestamp, id, seen }]);
// //         if (!seen && !viewedMessagesRef.current.has(id)) {
// //           socket.emit("message_seen", { messageId: id });
// //           viewedMessagesRef.current.add(id);
// //         }
// //       } else {
// //         setUnreadCounts((prev) => ({
// //           ...prev,
// //           [from]: (prev[from] || 0) + 1,
// //         }));
// //       }
// //     };
// //     socket.on("private_message", handlePrivate);
// //     return () => socket.off("private_message", handlePrivate);
// //   }, [receiver, mode]);

// //   useEffect(() => {
// //     const handlePrivateSent = ({ to, message, timestamp, id, seen }) => {
// //       if (receiver === to && mode === "private") {
// //         setMessages((prev) => [...prev, { sender: "You", message, timestamp, id, seen }]);
// //       }
// //     };
// //     socket.on("private_message_sent", handlePrivateSent);
// //     return () => socket.off("private_message_sent", handlePrivateSent);
// //   }, [receiver, mode]);

// //   useEffect(() => {
// //     const handleMessageSeen = ({ messageId, seen }) => {
// //       setMessages((prev) =>
// //         prev.map((msg) =>
// //           msg.id === messageId ? { ...msg, seen } : msg
// //         )
// //       );
// //     };
// //     socket.on("message_seen", handleMessageSeen);
// //     return () => socket.off("message_seen", handleMessageSeen);
// //   }, []);

// //   useEffect(() => {
// //     const handleGroupMsg = ({ group, message, from, timestamp, id, seen }) => {
// //       if (receiver === group && mode === "group") {
// //         setGroupMessages((prev) => ({
// //           ...prev,
// //           [group]: [...(prev[group] || []), { sender: from, message, timestamp, id, seen }],
// //         }));
// //         if (!seen && !viewedMessagesRef.current.has(id)) {
// //           socket.emit("group_message_seen", { messageId: id, group });
// //           viewedMessagesRef.current.add(id);
// //         }
// //       } else {
// //         setUnreadCounts((prev) => ({
// //           ...prev,
// //           [group]: (prev[group] || 0) + 1,
// //         }));
// //       }
// //     };
// //     socket.on("group_message", handleGroupMsg);
// //     return () => socket.off("group_message", handleGroupMsg);
// //   }, [receiver, mode]);

// //   useEffect(() => {
// //     const handleGroupMessageSeen = ({ messageId, seen, seenBy }) => {
// //       setGroupMessages((prev) => ({
// //         ...prev,
// //         [receiver]: (prev[receiver] || []).map((msg) =>
// //           msg.id === messageId ? { ...msg, seen, seenBy: seenBy || msg.seenBy } : msg
// //         ),
// //       }));
// //     };
// //     socket.on("group_message_seen", handleGroupMessageSeen);
// //     return () => socket.off("group_message_seen", handleGroupMessageSeen);
// //   }, [receiver]);

// //   useEffect(() => {
// //     const handleGroupCreated = ({ name, members, admins }) => {
// //       if (members.includes(username)) {
// //         setGroups((prev) => {
// //           const alreadyExists = prev.some((g) => g.name === name);
// //           if (alreadyExists) return prev;
// //           return [...prev, { name, members, admins }];
// //         });
// //       }
// //     };
// //     socket.on("group_created", handleGroupCreated);
// //     return () => socket.off("group_created", handleGroupCreated);
// //   }, [username]);

// //   useEffect(() => {
// //     const handleGroupUpdated = ({ name, members, admins, left, added, removed, newAdmin, removedAdmin }) => {
// //       if (members) {
// //         setGroups((prev) =>
// //           prev.map((g) =>
// //             g.name === name ? { ...g, members, admins } : g
// //           )
// //         );
// //         if (name === receiver && mode === "group") {
// //           setActiveGroupMembers(members);
// //           setActiveGroupAdmins(admins);
// //         }
// //         let systemMessage = "";
// //         if (left) systemMessage = `${left} left the group`;
// //         else if (added) systemMessage = `${added} was added to the group`;
// //         else if (removed) systemMessage = `${removed} was removed from the group`;
// //         else if (newAdmin) systemMessage = `${newAdmin} was made an admin`;
// //         else if (removedAdmin) systemMessage = `${removedAdmin} was removed as an admin`;
// //         if (systemMessage) {
// //           setGroupMessages((prev) => ({
// //             ...prev,
// //             [name]: [
// //               ...(prev[name] || []),
// //               { sender: "System", message: systemMessage, timestamp: new Date() }
// //             ]
// //           }));
// //         }
// //       } else {
// //         setGroups((prev) => prev.filter((g) => g.name !== name));
// //         setUnreadCounts((prev) => {
// //           const newCounts = { ...prev };
// //           delete newCounts[name];
// //           return newCounts;
// //         });
// //         if (name === receiver && mode === "group") {
// //           setReceiver("");
// //           setMode("private");
// //           setActiveGroupMembers([]);
// //           setActiveGroupAdmins([]);
// //         }
// //       }
// //     };
// //     socket.on("group_updated", handleGroupUpdated);
// //     return () => socket.off("group_updated", handleGroupUpdated);
// //   }, [username, receiver, mode]);

// //   useEffect(() => {
// //     const handleGroupLeft = ({ name }) => {
// //       setGroups((prev) => prev.filter((g) => g.name !== name));
// //       setUnreadCounts((prev) => {
// //         const newCounts = { ...prev };
// //         delete newCounts[name];
// //         return newCounts;
// //       });
// //       if (name === receiver && mode === "group") {
// //         setReceiver("");
// //         setMode("private");
// //         setActiveGroupMembers([]);
// //         setActiveGroupAdmins([]);
// //       }
// //     };
// //     socket.on("group_left", handleGroupLeft);
// //     return () => socket.off("group_left", handleGroupLeft);
// //   }, [receiver, mode]);

// //   useEffect(() => {
// //     const handleTyping = ({ username, from, group }) => {
// //       if (group && group === receiver && mode === "group") {
// //         setTypingUsers((prev) => ({ ...prev, [username]: group }));
// //       } else if (from && from === receiver && mode === "private") {
// //         setTypingUsers((prev) => ({ ...prev, [username]: from }));
// //       }
// //     };
// //     socket.on("typing", handleTyping);
// //     return () => socket.off("typing", handleTyping);
// //   }, [receiver, mode]);

// //   useEffect(() => {
// //     const handleStopTyping = ({ username, from, group }) => {
// //       setTypingUsers((prev) => {
// //         const newTyping = { ...prev };
// //         delete newTyping[username];
// //         return newTyping;
// //       });
// //     };
// //     socket.on("stop_typing", handleStopTyping);
// //     return () => socket.off("stop_typing", handleStopTyping);
// //   }, []);

// //   const displayedMessages =
// //     mode === "group" ? groupMessages[receiver] || [] : messages;

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //     if (receiver) {
// //       const messagesToMark = mode === "group" ? groupMessages[receiver] || [] : messages;
// //       messagesToMark.forEach((msg) => {
// //         if (!msg.seen && !viewedMessagesRef.current.has(msg.id)) {
// //           socket.emit(mode === "group" ? "group_message_seen" : "message_seen", {
// //             messageId: msg.id,
// //             group: mode === "group" ? receiver : undefined,
// //           });
// //           viewedMessagesRef.current.add(msg.id);
// //         }
// //       });
// //     }
// //   }, [displayedMessages, receiver, mode]);

// //   const handleTyping = () => {
// //     if (!receiver) return;
// //     socket.emit("typing", { to: mode === "private" ? receiver : null, group: mode === "group" ? receiver : null });

// //     if (typingTimeoutRef.current) {
// //       clearTimeout(typingTimeoutRef.current);
// //     }

// //     typingTimeoutRef.current = setTimeout(() => {
// //       socket.emit("stop_typing", { to: mode === "private" ? receiver : null, group: mode === "group" ? receiver : null });
// //     }, 3000);
// //   };

// //   const sendMessage = () => {
// //     if (!message.trim()) return;
// //     const timestamp = new Date();

// //     if (mode === "private" && receiver) {
// //       socket.emit("private_message", { to: receiver, message });
// //     } else if (mode === "group" && receiver) {
// //       socket.emit("send_group_message", {
// //         group: receiver,
// //         message,
// //         from: username,
// //       });
// //     }

// //     setMessage("");
// //     if (typingTimeoutRef.current) {
// //       clearTimeout(typingTimeoutRef.current);
// //       socket.emit("stop_typing", { to: mode === "private" ? receiver : null, group: mode === "group" ? receiver : null });
// //     }
// //   };

// //   const createGroup = () => {
// //     if (!groupName || groupMembers.length < 2) return;
// //     const fullGroup = [...groupMembers, username];
// //     const exists = groups.some((g) => g.name === groupName);
// //     if (exists) return;

// //     socket.emit("create_group", { name: groupName, members: fullGroup, creator: username });

// //     setGroups((prev) => [...prev, { name: groupName, members: fullGroup, admins: [username] }]);
// //     setReceiver(groupName);
// //     setMode("group");
// //     setActiveGroupMembers(fullGroup);
// //     setActiveGroupAdmins([username]);
// //     setGroupName("");
// //     setGroupMembers([]);
// //     setShowCreateGroup(false);
// //   };

// //   const leaveGroup = () => {
// //     if (mode !== "group" || !receiver) return;
// //     socket.emit("leave_group", { group: receiver, username });
// //   };

// //   const addMember = (newMember) => {
// //     if (mode !== "group" || !receiver || !activeGroupAdmins.includes(username)) return;
// //     socket.emit("add_member", { group: receiver, username: newMember, requester: username });
// //   };

// //   const removeMember = (member) => {
// //     if (mode !== "group" || !receiver || !activeGroupAdmins.includes(username)) return;
// //     socket.emit("remove_member", { group: receiver, username: member, requester: username });
// //   };

// //   const assignAdmin = (member) => {
// //     if (mode !== "group" || !receiver || !activeGroupAdmins.includes(username)) return;
// //     socket.emit("assign_admin", { group: receiver, username: member, requester: username });
// //   };

// //   const removeAdmin = (member) => {
// //     if (mode !== "group" || !receiver || !activeGroupAdmins.includes(username)) return;
// //     socket.emit("remove_admin", { group: receiver, username: member, requester: username });
// //   };

// //   const selectGroup = (group) => {
// //     setReceiver(group.name);
// //     setMode("group");
// //     setActiveGroupMembers(group.members);
// //     setActiveGroupAdmins(group.admins);
// //     setUnreadCounts((prev) => {
// //       const newCounts = { ...prev };
// //       delete newCounts[group.name];
// //       return newCounts;
// //     });
// //     if (window.innerWidth < 768) {
// //       setShowSidebar(false);
// //     }
// //   };

// //   const selectPrivate = (user) => {
// //     setReceiver(user);
// //     setMode("private");
// //     setMessages([]);
// //     setUnreadCounts((prev) => {
// //       const newCounts = { ...prev };
// //       delete newCounts[user];
// //       return newCounts;
// //     });
// //     if (window.innerWidth < 768) {
// //       setShowSidebar(false);
// //     }
// //   };

// //   const formatTime = (date) => {
// //     if (!date) return "";
// //     const options = { hour: "2-digit", minute: "2-digit" };
// //     return new Date(date).toLocaleTimeString([], options);
// //   };

// //   const formatLastSeen = (lastSeen) => {
// //     if (!lastSeen) return "Last seen: Unknown";
// //     const now = new Date();
// //     const diffMs = now - new Date(lastSeen);
// //     const diffMin = Math.round(diffMs / 60000);
// //     if (diffMin < 1) return "Last seen: Just now";
// //     if (diffMin < 60) return `Last seen: ${diffMin} min${diffMin === 1 ? "" : "s"} ago`;
// //     const diffHours = Math.round(diffMin / 60);
// //     if (diffHours < 24) return `Last seen: ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
// //     return `Last seen: ${new Date(lastSeen).toLocaleString()}`;
// //   };

// //   const filteredUsers = allUsers.filter((user) =>
// //     user.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const filteredGroups = groups.filter((group) =>
// //     group.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <div className="h-screen flex flex-col bg-gray-100">
// //       <div className="bg-teal-600 text-white p-4 flex justify-between items-center shadow-md">
// //         {!showSidebar && (
// //           <button
// //             onClick={() => setShowSidebar(true)}
// //             className="md:hidden text-white"
// //           >
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="h-6 w-6"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M4 6h16M4 12h16M4 18h16"
// //               />
// //             </svg>
// //           </button>
// //         )}
// //         <h1 className="font-bold text-xl">WhatsChat</h1>
// //         <div className="flex items-center space-x-4">
// //           <span className="hidden md:inline">{username}</span>
// //           <button
// //             onClick={() => setShowCreateGroup(!showCreateGroup)}
// //             className="p-2 rounded-full hover:bg-teal-700 transition-colors"
// //           >
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="h-5 w-5"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M12 4v16m8-8H4"
// //               />
// //             </svg>
// //           </button>
// //         </div>
// //       </div>

// //       <div className="flex flex-1 overflow-hidden">
// //         <div
// //           className={`${
// //             showSidebar ? "flex" : "hidden"
// //           } md:flex flex-col w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 shadow-sm`}
// //         >
// //           <div className="p-2 bg-gray-50">
// //             <div className="relative">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <svg
// //                   className="h-5 w-5 text-gray-400"
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   fill="none"
// //                   viewBox="0 0 24 24"
// //                   stroke="currentColor"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={2}
// //                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
// //                   />
// //                 </svg>
// //               </div>
// //               <input
// //                 type="text"
// //                 placeholder="Search conversations"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="p-2 pl-10 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
// //               />
// //             </div>
// //           </div>

// //           {showCreateGroup && (
// //             <div className="p-4 bg-white border-b border-gray-200">
// //               <h2 className="font-bold text-gray-700 mb-2">Create New Group</h2>
// //               <input
// //                 placeholder="Group name"
// //                 value={groupName}
// //                 onChange={(e) => setGroupName(e.target.value)}
// //                 className="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
// //               />
// //               <div className="text-sm font-medium text-gray-600 mb-1">
// //                 Select users:
// //               </div>
// //               <div className="border rounded-lg p-2 mb-2 max-h-40 overflow-y-auto">
// //                 {allUsers.map((u) => (
// //                   <div key={u} className="py-1">
// //                     <label className="inline-flex items-center w-full space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
// //                       <input
// //                         type="checkbox"
// //                         checked={groupMembers.includes(u)}
// //                         onChange={() =>
// //                           setGroupMembers((prev) =>
// //                             prev.includes(u)
// //                               ? prev.filter((x) => x !== u)
// //                               : [...prev, u]
// //                           )
// //                         }
// //                         className="text-teal-600 rounded focus:ring-teal-500"
// //                       />
// //                       <span>{u}</span>
// //                     </label>
// //                   </div>
// //                 ))}
// //               </div>
// //               <div className="flex justify-end space-x-2">
// //                 <button
// //                   onClick={() => setShowCreateGroup(false)}
// //                   className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={createGroup}
// //                   className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
// //                   disabled={!groupName || groupMembers.length < 2}
// //                 >
// //                   Create
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           <div className="flex-1 overflow-y-auto">
// //             {filteredGroups.length > 0 && (
// //               <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
// //                 Groups
// //               </div>
// //             )}
// //             {filteredGroups.map((g) => (
// //               <div
// //                 key={g.name}
// //                 onClick={() => selectGroup(g)}
// //                 className={`p-3 flex items-center border-b border-gray-100 cursor-pointer ${
// //                   receiver === g.name && mode === "group"
// //                     ? "bg-teal-50"
// //                     : "hover:bg-gray-50"
// //                 }`}
// //               >
// //                 <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mr-3">
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     className="h-6 w-6"
// //                     fill="none"
// //                     viewBox="0 0 24 24"
// //                     stroke="currentColor"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
// //                     />
// //                   </svg>
// //                 </div>
// //                 <div className="flex-1">
// //                   <div className="font-medium">{g.name}</div>
// //                   <div className="text-sm text-gray-500 truncate">
// //                     {g.members.length} members
// //                     {g.admins.includes(username) && " (Admin)"}
// //                   </div>
// //                 </div>
// //                 {unreadCounts[g.name] > 0 && (
// //                   <div className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
// //                     {unreadCounts[g.name]}
// //                   </div>
// //                 )}
// //               </div>
// //             ))}

// //             {filteredUsers.length > 0 && (
// //               <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
// //                 Users
// //               </div>
// //             )}
// //             {filteredUsers.map((u) => (
// //               <div
// //                 key={u}
// //                 onClick={() => selectPrivate(u)}
// //                 className={`p-3 flex items-center border-b border-gray-100 cursor-pointer ${
// //                   receiver === u && mode === "private"
// //                     ? "bg-teal-50"
// //                     : "hover:bg-gray-50"
// //                 }`}
// //               >
// //                 <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
// //                   <span className="font-medium">
// //                     {u.charAt(0).toUpperCase()}
// //                   </span>
// //                 </div>
// //                 <div className="flex-1">
// //                   <div className="font-medium">{u}</div>
// //                   <div className="text-sm text-gray-500 truncate">
// //                     {onlineStatus[u]?.isOnline
// //                       ? "Online"
// //                       : formatLastSeen(onlineStatus[u]?.lastSeen)}
// //                   </div>
// //                 </div>
// //                 {unreadCounts[u] > 0 && (
// //                   <div className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
// //                     {unreadCounts[u]}
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           <div className="md:hidden p-2 border-t border-gray-200">
// //             <button
// //               onClick={() => setShowSidebar(false)}
// //               className="w-full p-2 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center"
// //             >
// //               Back to Chat
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-5 w-5 ml-1"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M9 5l7 7-7 7"
// //                 />
// //               </svg>
// //             </button>
// //           </div>
// //         </div>

// //         <div
// //           className={`${
// //             !showSidebar ? "flex" : "hidden"
// //           } md:flex flex-col flex-1 bg-gray-50`}
// //         >
// //           {receiver ? (
// //             <>
// //               <div className="bg-white p-3 flex items-center border-b border-gray-200 shadow-sm">
// //                 <button
// //                   onClick={() => setShowSidebar(true)}
// //                   className="md:hidden mr-2 text-gray-600"
// //                 >
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     className="h-6 w-6"
// //                     fill="none"
// //                     viewBox="0 0 24 24"
// //                     stroke="currentColor"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M15 19l-7-7 7-7"
// //                     />
// //                   </svg>
// //                 </button>

// //                 <div
// //                   className={`${
// //                     mode === "group"
// //                       ? "bg-teal-100 text-teal-600"
// //                       : "bg-blue-100 text-blue-600"
// //                   } h-10 w-10 rounded-full flex items-center justify-center mr-3`}
// //                 >
// //                   {mode === "group" ? (
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       className="h-5 w-5"
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                       stroke="currentColor"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
// //                       />
// //                     </svg>
// //                   ) : (
// //                     <span className="font-medium">
// //                       {receiver.charAt(0).toUpperCase()}
// //                     </span>
// //                   )}
// //                 </div>

// //                 <div className="flex-1">
// //                   <div className="font-medium">{receiver}</div>
// //                   <div className="text-xs text-gray-500">
// //                     {mode === "group"
// //                       ? `${activeGroupMembers?.length || 0} members${
// //                           activeGroupAdmins.includes(username) ? " (Admin)" : ""
// //                         }`
// //                       : Object.keys(typingUsers).includes(receiver)
// //                       ? "Typing..."
// //                       : onlineStatus[receiver]?.isOnline
// //                       ? "Online"
// //                       : formatLastSeen(onlineStatus[receiver]?.lastSeen)}
// //                   </div>
// //                   {mode === "group" &&
// //                     Object.keys(typingUsers).some(
// //                       (user) => typingUsers[user] === receiver
// //                     ) && (
// //                       <div className="text-xs text-teal-600">
// //                         {Object.keys(typingUsers)
// //                           .filter((user) => typingUsers[user] === receiver)
// //                           .join(", ")}{" "}
// //                         {Object.keys(typingUsers).length > 1
// //                           ? "are typing..."
// //                           : "is typing..."}
// //                       </div>
// //                     )}
// //                 </div>
// //                 {mode === "group" && (
// //                   <div className="flex space-x-2">
// //                     {activeGroupAdmins.includes(username) && (
// //                       <button
// //                         onClick={() => setShowManageGroup(true)}
// //                         className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       >
// //                         Manage Group
// //                       </button>
// //                     )}
// //                     <button
// //                       onClick={leaveGroup}
// //                       className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
// //                     >
// //                       Leave Group
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>

// //               {showManageGroup && activeGroupAdmins.includes(username) && (
// //                 <div className="absolute top-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 z-10">
// //                   <h2 className="font-bold text-gray-700 mb-2">
// //                     Manage Group: {receiver}
// //                   </h2>
// //                   <div className="mb-4">
// //                     <h3 className="text-sm font-medium text-gray-600 mb-1">
// //                       Add Members
// //                     </h3>
// //                     <div className="border rounded-lg p-2 max-h-40 overflow-y-auto">
// //                       {allUsers
// //                         .filter((u) => !activeGroupMembers.includes(u))
// //                         .map((u) => (
// //                           <div
// //                             key={u}
// //                             className="py-1 flex justify-between items-center"
// //                           >
// //                             <span>{u}</span>
// //                             <button
// //                               onClick={() => addMember(u)}
// //                               className="text-sm text-blue-600 hover:underline"
// //                             >
// //                               Add
// //                             </button>
// //                           </div>
// //                         ))}
// //                     </div>
// //                   </div>
// //                   <div className="mb-4">
// //                     <h3 className="text-sm font-medium text-gray-600 mb-1">
// //                       Current Members
// //                     </h3>
// //                     <div className="border rounded-lg p-2 max-h-40 overflow-y-auto">
// //                       {activeGroupMembers.map((m) => (
// //                         <div
// //                           key={m}
// //                           className="py-1 flex justify-between items-center"
// //                         >
// //                           <span>
// //                             {m} {activeGroupAdmins.includes(m) ? "(Admin)" : ""}
// //                           </span>
// //                           <div className="flex space-x-2">
// //                             {activeGroupAdmins.includes(m) && m !== username && (
// //                               <button
// //                                 onClick={() => removeAdmin(m)}
// //                                 className="text-sm text-orange-600 hover:underline"
// //                               >
// //                                 Remove Admin
// //                               </button>
// //                             )}
// //                             {!activeGroupAdmins.includes(m) && (
// //                               <button
// //                                 onClick={() => assignAdmin(m)}
// //                                 className="text-sm text-green-600 hover:underline"
// //                               >
// //                                 Make Admin
// //                               </button>
// //                             )}
// //                             {m !== username && (
// //                               <button
// //                                 onClick={() => removeMember(m)}
// //                                 className="text-sm text-red-600 hover:underline"
// //                               >
// //                                 Remove
// //                               </button>
// //                             )}
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                   <div className="flex justify-end">
// //                     <button
// //                       onClick={() => setShowManageGroup(false)}
// //                       className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
// //                     >
// //                       Close
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}

// //               <div
// //                 className="flex-1 overflow-y-auto p-4 bg-gray-100"
// //                 style={{
// //                   backgroundImage:
// //                     "url('https://web.whatsapp.com/img/bg-chat-tile_9e8a2898faedb7db9bf5638405cf81ae.png')",
// //                 }}
// //               >
// //                 {displayedMessages.length === 0 ? (
// //                   <div className="flex items-center justify-center h-full text-gray-500">
// //                     No messages yet. Start the conversation!
// //                   </div>
// //                 ) : (
// //                   displayedMessages.map((msg, idx) => {
// //                     const isMe = msg.sender === "You";
// //                     return (
// //                       <div
// //                         key={msg.id || idx}
// //                         className={`mb-2 flex ${isMe ? "justify-end" : "justify-start"}`}
// //                       >
// //                         <div
// //                           className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 shadow-sm ${
// //                             isMe
// //                               ? "bg-teal-100 text-gray-800"
// //                               : msg.sender === "System"
// //                               ? "bg-gray-200 text-gray-600 text-center"
// //                               : "bg-white text-gray-800"
// //                           }`}
// //                         >
// //                           {!isMe && mode === "group" && msg.sender !== "System" && (
// //                             <div className="font-medium text-sm text-teal-700">
// //                               {msg.sender}
// //                             </div>
// //                           )}
// //                           <div className="text-sm">{msg.message}</div>
// //                           <div className="text-right mt-1 flex items-center justify-end">
// //                             <span className="text-xs text-gray-500">
// //                               {formatTime(msg.timestamp)}
// //                             </span>
// //                             {isMe && (
// //                               <span className="ml-1 text-gray-400 flex items-center">
// //                                 {msg.seen ? (
// //                                   <>
// //                                     <svg
// //                                       xmlns="http://www.w3.org/2000/svg"
// //                                       className="h-3 w-3 inline text-blue-500"
// //                                       fill="none"
// //                                       viewBox="0 0 24 24"
// //                                       stroke="currentColor"
// //                                     >
// //                                       <path
// //                                         strokeLinecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth={2}
// //                                         d="M5 13l4 4L19 7"
// //                                       />
// //                                     </svg>
// //                                     <svg
// //                                       xmlns="http://www.w3.org/2000/svg"
// //                                       className="h-3 w-3 inline text-blue-500"
// //                                       fill="none"
// //                                       viewBox="0 0 24 24"
// //                                       stroke="currentColor"
// //                                     >
// //                                       <path
// //                                         strokeLinecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth={2}
// //                                         d="M5 13l4 4L19 7"
// //                                       />
// //                                     </svg>
// //                                   </>
// //                                 ) : (
// //                                   <svg
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     className="h-3 w-3 inline"
// //                                     fill="none"
// //                                     viewBox="0 0 24 24"
// //                                     stroke="currentColor"
// //                                   >
// //                                     <path
// //                                       strokeLinecap="round"
// //                                       strokeLinejoin="round"
// //                                       strokeWidth={2}
// //                                       d="M5 13l4 4L19 7"
// //                                     />
// //                                   </svg>
// //                                 )}
// //                               </span>
// //                             )}
// //                             {mode === "group" && msg.seenBy && (
// //                               <span className="ml-1 text-xs text-gray-400">
// //                                 Seen by: {msg.seenBy}
// //                               </span>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     );
// //                   })
// //                 )}
// //                 <div ref={messagesEndRef} />
// //               </div>

// //               <div className="bg-white p-3 border-t border-gray-200">
// //                 <div className="flex items-center">
// //                   <div className="flex-1 relative">
// //                     <input
// //                       className="w-full p-3 pr-12 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
// //                       value={message}
// //                       onChange={(e) => {
// //                         setMessage(e.target.value);
// //                         handleTyping();
// //                       }}
// //                       onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// //                       placeholder="Type a message"
// //                     />
// //                   </div>
// //                   <button
// //                     onClick={sendMessage}
// //                     className="ml-2 h-10 w-10 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
// //                     disabled={!message.trim()}
// //                   >
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       className="h-5 w-5"
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                       stroke="currentColor"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
// //                       />
// //                     </svg>
// //                   </button>
// //                 </div>
// //               </div>
// //             </>
// //           ) : (
// //             <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400 flex-col p-6">
// //               <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   className="h-10 w-10 text-gray-400"
// //                   fill="none"
// //                   viewBox="0 0 24 24"
// //                   stroke="currentColor"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={2}
// //                     d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
// //                   />
// //                 </svg>
// //               </div>
// //               <h3 className="text-xl font-medium text-gray-600 mb-2">
// //                 Welcome to WhatsChat
// //               </h3>
// //               <p className="text-center text-gray-500 max-w-sm">
// //                 Select a conversation from the sidebar to start chatting.
// //               </p>
// //               <button
// //                 onClick={() => setShowSidebar(true)}
// //                 className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg md:hidden"
// //               >
// //                 View Conversations
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import ChatArea from "./component/ChatArea";

const socket = io("https://app-backend-1naq.onrender.com");

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [mode, setMode] = useState("private");
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [activeGroupMembers, setActiveGroupMembers] = useState([]);
  const [activeGroupAdmins, setActiveGroupAdmins] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showManageGroup, setShowManageGroup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typingUsers, setTypingUsers] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [onlineStatus, setOnlineStatus] = useState({});
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);
  const viewedMessagesRef = useRef(new Set());
  const router = useRouter();

  // Handle logout
  const handleLogout = async () => {
  try {
    const res = await fetch("https://app-backend-1naq.onrender.com/api/auth/logout", {
      method: "POST",
      credentials: "include", // Important to include cookies
    });

    if (res.ok) {
      localStorage.removeItem("username");
      socket.emit("leave", username);
      setUsername("");
      router.push("/login");
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (!savedUser) {
      router.push("/login");
      return;
    }
    setUsername(savedUser);
    socket.emit("join", savedUser);
    return () => socket.emit("leave", savedUser); // Cleanup on unmount
  }, [router]);

  // Fetch all registered users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://app-backend-1naq.onrender.com/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setAllUsers(data.filter((u) => u !== username));
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };
    if (username) fetchUsers();
  }, [username]);

  // Fetch user groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("https://app-backend-1naq.onrender.com/api/groups");
        if (!res.ok) throw new Error("Failed to fetch groups");
        const data = await res.json();
        setGroups(data.filter((g) => g.members.includes(username)));
      } catch (err) {
        console.error("Failed to load groups", err);
      }
    };
    if (username) fetchGroups();
  }, [username]);

  // Socket.io: Handle online status
  useEffect(() => {
    const handleOnlineStatus = ({ username, isOnline, lastSeen }) => {
      setOnlineStatus((prev) => ({
        ...prev,
        [username]: { isOnline, lastSeen: lastSeen ? new Date(lastSeen) : null },
      }));
    };
    socket.on("online_status", handleOnlineStatus);
    return () => socket.off("online_status", handleOnlineStatus);
  }, []);

  // Socket.io: Update online status based on connected users
  useEffect(() => {
    const handleUsers = (onlineUsers) => {
      setOnlineStatus((prev) => {
        const updatedStatus = { ...prev };
        allUsers.forEach((user) => {
          if (!updatedStatus[user]) {
            updatedStatus[user] = { isOnline: false, lastSeen: null };
          }
          updatedStatus[user].isOnline = onlineUsers.includes(user);
        });
        return updatedStatus;
      });
    };
    socket.on("users", handleUsers);
    return () => socket.off("users", handleUsers);
  }, [allUsers]);

  // Socket.io: Handle private messages
  useEffect(() => {
    const handlePrivate = ({ from, message, timestamp, id, seen }) => {
      if (receiver === from && mode === "private") {
        setMessages((prev) => [...prev, { sender: from, message, timestamp, id, seen }]);
        if (!seen && !viewedMessagesRef.current.has(id)) {
          socket.emit("message_seen", { messageId: id });
          viewedMessagesRef.current.add(id);
        }
      } else {
        setUnreadCounts((prev) => ({
          ...prev,
          [from]: (prev[from] || 0) + 1,
        }));
      }
    };
    socket.on("private_message", handlePrivate);
    return () => socket.off("private_message", handlePrivate);
  }, [receiver, mode]);

  // Socket.io: Handle sent private messages
  useEffect(() => {
    const handlePrivateSent = ({ to, message, timestamp, id, seen }) => {
      if (receiver === to && mode === "private") {
        setMessages((prev) => [...prev, { sender: "You", message, timestamp, id, seen }]);
      }
    };
    socket.on("private_message_sent", handlePrivateSent);
    return () => socket.off("private_message_sent", handlePrivateSent);
  }, [receiver, mode]);

  // Socket.io: Handle message seen status
  useEffect(() => {
    const handleMessageSeen = ({ messageId, seen }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, seen } : msg))
      );
    };
    socket.on("message_seen", handleMessageSeen);
    return () => socket.off("message_seen", handleMessageSeen);
  }, []);

  // Socket.io: Handle group messages
  useEffect(() => {
    const handleGroupMsg = ({ group, message, from, timestamp, id, seen }) => {
      if (receiver === group && mode === "group") {
        setGroupMessages((prev) => ({
          ...prev,
          [group]: [...(prev[group] || []), { sender: from, message, timestamp, id, seen }],
        }));
        if (!seen && !viewedMessagesRef.current.has(id)) {
          socket.emit("group_message_seen", { messageId: id, group });
          viewedMessagesRef.current.add(id);
        }
      } else {
        setUnreadCounts((prev) => ({
          ...prev,
          [group]: (prev[group] || 0) + 1,
        }));
      }
    };
    socket.on("group_message", handleGroupMsg);
    return () => socket.off("group_message", handleGroupMsg);
  }, [receiver, mode]);

  // Socket.io: Handle group message seen status
  useEffect(() => {
    const handleGroupMessageSeen = ({ messageId, seen, seenBy }) => {
      setGroupMessages((prev) => ({
        ...prev,
        [receiver]: (prev[receiver] || []).map((msg) =>
          msg.id === messageId ? { ...msg, seen, seenBy: seenBy || msg.seenBy } : msg
        ),
      }));
    };
    socket.on("group_message_seen", handleGroupMessageSeen);
    return () => socket.off("group_message_seen", handleGroupMessageSeen);
  }, [receiver]);

  // Socket.io: Handle group creation
  useEffect(() => {
    const handleGroupCreated = ({ name, members, admins }) => {
      if (members.includes(username)) {
        setGroups((prev) => {
          const alreadyExists = prev.some((g) => g.name === name);
          if (alreadyExists) return prev;
          return [...prev, { name, members, admins }];
        });
      }
    };
    socket.on("group_created", handleGroupCreated);
    return () => socket.off("group_created", handleGroupCreated);
  }, [username]);

  // Socket.io: Handle group updates
  useEffect(() => {
    const handleGroupUpdated = ({ name, members, admins, left, added, removed, newAdmin, removedAdmin }) => {
      if (members) {
        setGroups((prev) =>
          prev.map((g) => (g.name === name ? { ...g, members, admins } : g))
        );
        if (name === receiver && mode === "group") {
          setActiveGroupMembers(members);
          setActiveGroupAdmins(admins);
        }
        let systemMessage = "";
        if (left) systemMessage = `${left} left the group`;
        else if (added) systemMessage = `${added} was added to the group`;
        else if (removed) systemMessage = `${removed} was removed from the group`;
        else if (newAdmin) systemMessage = `${newAdmin} was made an admin`;
        else if (removedAdmin) systemMessage = `${removedAdmin} was removed as an admin`;
        if (systemMessage) {
          setGroupMessages((prev) => ({
            ...prev,
            [name]: [
              ...(prev[name] || []),
              { sender: "System", message: systemMessage, timestamp: new Date() },
            ],
          }));
        }
      } else {
        setGroups((prev) => prev.filter((g) => g.name !== name));
        setUnreadCounts((prev) => {
          const newCounts = { ...prev };
          delete newCounts[name];
          return newCounts;
        });
        if (name === receiver && mode === "group") {
          setReceiver("");
          setMode("private");
          setActiveGroupMembers([]);
          setActiveGroupAdmins([]);
        }
      }
    };
    socket.on("group_updated", handleGroupUpdated);
    return () => socket.off("group_updated", handleGroupUpdated);
  }, [username, receiver, mode]);

  // Socket.io: Handle group leave
  useEffect(() => {
    const handleGroupLeft = ({ name }) => {
      setGroups((prev) => prev.filter((g) => g.name !== name));
      setUnreadCounts((prev) => {
        const newCounts = { ...prev };
        delete newCounts[name];
        return newCounts;
      });
      if (name === receiver && mode === "group") {
        setReceiver("");
        setMode("private");
        setActiveGroupMembers([]);
        setActiveGroupAdmins([]);
      }
    };
    socket.on("group_left", handleGroupLeft);
    return () => socket.off("group_left", handleGroupLeft);
  }, [receiver, mode]);

  // Socket.io: Handle typing events
  useEffect(() => {
    const handleTyping = ({ username, from, group }) => {
      if (group && group === receiver && mode === "group") {
        setTypingUsers((prev) => ({ ...prev, [username]: group }));
      } else if (from && from === receiver && mode === "private") {
        setTypingUsers((prev) => ({ ...prev, [username]: from }));
      }
    };
    socket.on("typing", handleTyping);
    return () => socket.off("typing", handleTyping);
  }, [receiver, mode]);

  // Socket.io: Handle stop typing events
  useEffect(() => {
    const handleStopTyping = ({ username }) => {
      setTypingUsers((prev) => {
        const newTyping = { ...prev };
        delete newTyping[username];
        return newTyping;
      });
    };
    socket.on("stop_typing", handleStopTyping);
    return () => socket.off("stop_typing", handleStopTyping);
  }, []);

  

  const handleTyping = () => {
    if (!receiver) return;
    socket.emit("typing", { to: mode === "private" ? receiver : null, group: mode === "group" ? receiver : null });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", { to: mode === "private" ? receiver : null, group: mode === "group" ? receiver : null });
    }, 3000);
  };

  const sendMessage = () => {
    if (!message.trim() || !receiver) return;
    if (mode === "private") {
      socket.emit("private_message", { to: receiver, message });
    } else if (mode === "group") {
      socket.emit("send_group_message", { group: receiver, message, from: username });
    }
    setMessage("");
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      socket.emit("stop_typing", { to: mode === "private" ? receiver : null, group: mode === "group" ? receiver : null });
    }
  };

  const createGroup = () => {
    if (!groupName || groupMembers.length < 2) return;
    const fullGroup = [...groupMembers, username];
    const exists = groups.some((g) => g.name === groupName);
    if (exists) return;
    socket.emit("create_group", { name: groupName, members: fullGroup, creator: username });
    setGroupName("");
    setGroupMembers([]);
    setShowCreateGroup(false);
  };

  const leaveGroup = () => {
    if (mode !== "group" || !receiver) return;
    socket.emit("leave_group", { group: receiver, username });
  };

  const addMember = (newMember) => {
    if (mode !== "group" || !receiver || !activeGroupAdmins.includes(username)) return;
    socket.emit("add_member", { group: receiver, username: newMember, requester: username });
  };

  const removeMember = (member) => {
    if (mode !== "group" || !receiver || !activeGroupAdmins.includes(username)) return;
    socket.emit("remove_member", { group: receiver, username: member, requester: username });
  };

  const assignAdmin = (member) => {
    if (mode !== "group" || !receiver || !activeGroupAdmins.includes(username)) return;
    socket.emit("assign_admin", { group: receiver, username: member, requester: username });
  };

  const removeAdmin = (member) => {
    if (mode !== "group" || !receiver || !activeGroupAdmins.includes(username)) return;
    socket.emit("remove_admin", { group: receiver, username: member, requester: username });
  };

  const selectGroup = (group) => {
    setReceiver(group.name);
    setMode("group");
    setActiveGroupMembers(group.members);
    setActiveGroupAdmins(group.admins);
    setUnreadCounts((prev) => {
      const newCounts = { ...prev };
      delete newCounts[group.name];
      return newCounts;
    });
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  const selectPrivate = async (user) => {
  setReceiver(user);
  setMode("private");
  setUnreadCounts((prev) => {
    const newCounts = { ...prev };
    delete newCounts[user];
    return newCounts;
  });
  if (window.innerWidth < 768) setShowSidebar(false);

  try {
    const res = await fetch(`https://app-backend-1naq.onrender.com/api/messages/${username}/${user}`);
    if (!res.ok) throw new Error("Failed to fetch messages");
    const data = await res.json();
    setMessages(data);
  } catch (err) {
    console.error("Failed to load messages", err);
    setMessages([]); // Clear messages on error
  }
};


  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header
        username={username}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setShowCreateGroup={setShowCreateGroup}
        handleLogout={handleLogout}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showCreateGroup={showCreateGroup}
          setShowCreateGroup={setShowCreateGroup}
          groupName={groupName}
          setGroupName={setGroupName}
          groupMembers={groupMembers}
          setGroupMembers={setGroupMembers}
          allUsers={allUsers}
          groups={groups}
          username={username}
          unreadCounts={unreadCounts}
          onlineStatus={onlineStatus}
          selectGroup={selectGroup}
          selectPrivate={selectPrivate}
          createGroup={createGroup}
          receiver={receiver}
          mode={mode}
        />
        <ChatArea
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          receiver={receiver}
          mode={mode}
          messages={messages}
          groupMessages={groupMessages}
          activeGroupMembers={activeGroupMembers}
          activeGroupAdmins={activeGroupAdmins}
          username={username}
          typingUsers={typingUsers}
          showManageGroup={showManageGroup}
          setShowManageGroup={setShowManageGroup}
          leaveGroup={leaveGroup}
          addMember={addMember}
          removeMember={removeMember}
          assignAdmin={assignAdmin}
          removeAdmin={removeAdmin}
          allUsers={allUsers}
          message={message}
          setMessage={setMessage}
          handleTyping={handleTyping}
          sendMessage={sendMessage}
          messagesEndRef={messagesEndRef}
          onlineStatus={onlineStatus}
        />
      </div>
    </div>
  );
}

