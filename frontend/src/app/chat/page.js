"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import ChatArea from "./component/ChatArea";
import MessageInput from "./component/MessageInput";
import ManageGroupModal from "./component/ManageGroupModal";

// Initialize socket connection
const socket = io("https://app-backend-1naq.onrender.com");

// Define TypeScript interfaces for type safety
interface Message {
  sender: string;
  message: string;
  timestamp: Date | string;
  id: string;
  seen: boolean;
  seenBy?: string[];
}

interface Group {
  name: string;
  members: string[];
  admins: string[];
}

interface OnlineStatus {
  [username: string]: { isOnline: boolean; lastSeen: Date | null };
}

interface TypingUsers {
  [username: string]: string;
}

interface UnreadCounts {
  [key: string]: number;
}

export default function ChatPage() {
  // State with TypeScript types
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [groupMessages, setGroupMessages] = useState<{ [group: string]: Message[] }>({});
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [mode, setMode] = useState<"private" | "group">("private");
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroupMembers, setActiveGroupMembers] = useState<string[]>([]);
  const [activeGroupAdmins, setActiveGroupAdmins] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [showCreateGroup, setShowCreateGroup] = useState<boolean>(false);
  const [showManageGroup, setShowManageGroup] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typingUsers, setTypingUsers] = useState<TypingUsers>({});
  const [unreadCounts, setUnreadCounts] = useState<UnreadCounts>({});
  const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>({});
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const viewedMessagesRef = useRef<Set<string>>(new Set());

  // Handle user join on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (!savedUser) return;
    setUsername(savedUser);
    socket.emit("join", savedUser);
  }, []);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://app-backend-1naq.onrender.com/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data: string[] = await res.json();
        setAllUsers(data.filter((u) => u !== username));
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };

    if (username) {
      fetchUsers();
    }
  }, [username]);

  // Fetch user groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("https://app-backend-1naq.onrender.com/api/groups");
        const data: Group[] = await res.json();
        const userGroups = data.filter((g) => g.members.includes(username));
        setGroups(userGroups);
      } catch (err) {
        console.error("Failed to load groups", err);
      }
    };

    if (username) {
      fetchGroups();
    }
  }, [username]);

  // Handle online status updates
  useEffect(() => {
    const handleOnlineStatus = ({ username, isOnline, lastSeen }: { username: string; isOnline: boolean; lastSeen?: string }) => {
      setOnlineStatus((prev) => ({
        ...prev,
        [username]: { isOnline, lastSeen: lastSeen ? new Date(lastSeen) : null },
      }));
    };
    socket.on("online_status", handleOnlineStatus);
    return () => socket.off("online_status", handleOnlineStatus);
  }, []);

  // Update online status for all users
  useEffect(() => {
    const handleUsers = (onlineUsers: string[]) => {
      setOnlineStatus((prev) => {
        const updatedStatus: OnlineStatus = { ...prev };
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

  // Handle incoming private messages
  useEffect(() => {
    const handlePrivate = ({ from, message, timestamp, id, seen }: Message) => {
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

  // Handle sent private messages
  useEffect(() => {
    const handlePrivateSent = ({ to, message, timestamp, id, seen }: Message) => {
      if (receiver === to && mode === "private") {
        setMessages((prev) => [...prev, { sender: "You", message, timestamp, id, seen }]);
      }
    };
    socket.on("private_message_sent", handlePrivateSent);
    return () => socket.off("private_message_sent", handlePrivateSent);
  }, [receiver, mode]);

  // Handle private message seen status
  useEffect(() => {
    const handleMessageSeen = ({ messageId, seen }: { messageId: string; seen: boolean }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, seen } : msg))
      );
    };
    socket.on("message_seen", handleMessageSeen);
    return () => socket.off("message_seen", handleMessageSeen);
  }, []);

  // Handle incoming group messages
  useEffect(() => {
    const handleGroupMsg = ({ group, message, from, timestamp, id, seen }: { group: string } & Message) => {
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

  // Handle group message seen status
  useEffect(() => {
    const handleGroupMessageSeen = ({ messageId, seen, seenBy }: { messageId: string; seen: boolean; seenBy?: string[] }) => {
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

  // Handle group creation
  useEffect(() => {
    const handleGroupCreated = ({ name, members, admins }: Group) => {
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

  // Handle group updates
  useEffect(() => {
    const handleGroupUpdated = ({
      name,
      members,
      admins,
      left,
      added,
      removed,
      newAdmin,
      removedAdmin,
    }: Group & { left?: string; added?: string; removed?: string; newAdmin?: string; removedAdmin?: string }) => {
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

  // Handle group leave
  useEffect(() => {
    const handleGroupLeft = ({ name }: { name: string }) => {
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

  // Handle typing indicators
  useEffect(() => {
    const handleTyping = ({ username, from, group }: { username: string; from?: string; group?: string }) => {
      if (group && group === receiver && mode === "group") {
        setTypingUsers((prev) => ({ ...prev, [username]: group }));
      } else if (from && from === receiver && mode === "private") {
        setTypingUsers((prev) => ({ ...prev, [username]: from }));
      }
    };
    socket.on("typing", handleTyping);
    return () => socket.off("typing", handleTyping);
  }, [receiver, mode]);

  // Handle stop typing
  useEffect(() => {
    const handleStopTyping = ({ username, from, group }: { username: string; from?: string; group?: string }) => {
      setTypingUsers((prev) => {
        const newTyping = { ...prev };
        delete newTyping[username];
        return newTyping;
      });
    };
    socket.on("stop_typing", handleStopTyping);
    return () => socket.off("stop_typing", handleStopTyping);
  }, []);

  // Compute displayed messages
  const displayedMessages = mode === "group" ? groupMessages[receiver] || [] : messages;

  // Scroll to latest message and mark messages as seen
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (receiver) {
      const messagesToMark = mode === "group" ? groupMessages[receiver] || [] : messages;
      messagesToMark.forEach((msg) => {
        if (!msg.seen && !viewedMessagesRef.current.has(msg.id)) {
          socket.emit(mode === "group" ? "group_message_seen" : "message_seen", {
            messageId: msg.id,
            group: mode === "group" ? receiver : undefined,
          });
          viewedMessagesRef.current.add(msg.id);
        }
      });
    }
  }, [displayedMessages, receiver, mode]);

  // Handle typing event
  const handleTyping = () => {
    if (!receiver) return;
    socket.emit("typing", {
      to: mode === "private" ? receiver : null,
      group: mode === "group" ? receiver : null,
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", {
        to: mode === "private" ? receiver : null,
        group: mode === "group" ? receiver : null,
      });
    }, 3000);
  };

  // Send message
  const sendMessage = () => {
    if (!message.trim()) return;
    const timestamp = new Date();

    if (mode === "private" && receiver) {
      socket.emit("private_message", { to: receiver, message });
    } else if (mode === "group" && receiver) {
      socket.emit("send_group_message", {
        group: receiver,
        message,
        from: username,
      });
    }

    setMessage("");
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      socket.emit("stop_typing", {
        to: mode === "private" ? receiver : null,
        group: mode === "group" ? receiver : null,
      });
    }
  };

  // Create a new group
  const createGroup = () => {
    if (!groupName || groupMembers.length < 2) return;
    const fullGroup = [...groupMembers, username];
    const exists = groups.some((g) => g.name === groupName);
    if (exists) return;

    socket.emit("create_group", { name: groupName, members: fullGroup, creator: username });

    setGroups((prev) => [...prev, { name: groupName, members: fullGroup, admins: [username] }]);
    setReceiver(groupName);
    setMode("group");
    setActiveGroupMembers(fullGroup);
    setActiveGroupAdmins([username]);
    setGroupName("");
    setGroupMembers([]);
    setShowCreateGroup(false);
  };

  // Leave a group
  const leaveGroup = () => {
    if (mode !== "group" || !receiver) return;
    socket.emit("leave_group", { group: receiver, username });
  };

  // Add a member to a group
  const addMember = (newMember: string) => {
    if (mode !== "group" || !receiver || !activeGroupAdmins.includes(username)) return;
    socket.emit("add_member", { group: receiver, username: newMember, requester: username });
  };

  // Remove a member from a group
  const removeMember = (member: string) => {
    if (mode !== "group" || !receiver || !activeGroupAdmins.includes(username)) return;
    socket.emit("remove_member", { group: receiver, username: member, requester: username });
  };

  // Assign admin role
  const assignAdmin = (member: string) => {
    if (mode !== "group" || !receiver || !activeGroupAdmins.includes(username)) return;
    socket.emit("assign_admin", { group: receiver, username: member, requester: username });
  };

  // Remove admin role
  const removeAdmin = (member: string) => {
    if (mode !== "group" || !receiver || !activeGroupAdmins.includes(username)) return;
    socket.emit("remove_admin", { group: receiver, username: member, requester: username });
  };

  // Select a group for messaging
  const selectGroup = (group: Group) => {
    setReceiver(group.name);
    setMode("group");
    setActiveGroupMembers(group.members);
    setActiveGroupAdmins(group.admins);
    setUnreadCounts((prev) => {
      const newCounts = { ...prev };
      delete newCounts[group.name];
      return newCounts;
    });
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  // Select a user for private messaging
  const selectPrivate = (user: string) => {
    setReceiver(user);
    setMode("private");
    setMessages([]);
    setUnreadCounts((prev) => {
      const newCounts = { ...prev };
      delete newCounts[user];
      return newCounts;
    });
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  // Filter users and groups with safeguard for searchTerm
  const filteredUsers = allUsers.filter((user) =>
    user.toLowerCase().includes((searchTerm || "").toLowerCase())
  );
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header
        username={username}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setShowCreateGroup={setShowCreateGroup}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredUsers={filteredUsers}
          filteredGroups={filteredGroups}
          selectPrivate={selectPrivate}
          selectGroup={selectGroup}
          unreadCounts={unreadCounts}
          onlineStatus={onlineStatus}
          showCreateGroup={showCreateGroup}
          setShowCreateGroup={setShowCreateGroup}
          groupName={groupName}
          setGroupName={setGroupName}
          groupMembers={groupMembers}
          setGroupMembers={setGroupMembers}
          allUsers={allUsers}
          createGroup={createGroup}
          username={username}
          receiver={receiver}
          mode={mode}
        />
        <div className="flex flex-col flex-1">
          <ChatArea
            mode={mode}
            receiver={receiver}
            displayedMessages={displayedMessages}
            messagesEndRef={messagesEndRef}
            activeGroupMembers={activeGroupMembers}
            activeGroupAdmins={activeGroupAdmins}
            username={username}
            typingUsers={typingUsers}
            onlineStatus={onlineStatus}
            setShowSidebar={setShowSidebar}
            setShowManageGroup={setShowManageGroup}
            leaveGroup={leaveGroup}
          />
          {receiver && (
            <MessageInput
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
              handleTyping={handleTyping}
            />
          )}
          <ManageGroupModal
            showManageGroup={showManageGroup}
            setShowManageGroup={setShowManageGroup}
            receiver={receiver}
            activeGroupMembers={activeGroupMembers}
            activeGroupAdmins={activeGroupAdmins}
            username={username}
            allUsers={allUsers}
            addMember={addMember}
            removeMember={removeMember}
            assignAdmin={assignAdmin}
            removeAdmin={removeAdmin}
          />
        </div>
      </div>
    </div>
  );
}
