// const Group = require("../models/Group");
// const Message = require("../models/Message");
// const User = require("../models/User");

// const setupSocket = (io) => {
//   const users = {};

//   io.on("connection", (socket) => {
//     console.log("A user connected");

//     socket.on("join", async (username) => {
//       const user = await User.findOne({ username });
//       if (!user) return;

//       socket.username = username;
//       socket.userId = user._id;

//       users[username] = { socketId: socket.id, userId: user._id };

//       const userGroups = await Group.find({ members: username });
//       userGroups.forEach((group) => {
//         socket.join(group.name);
//         console.log(`${username} joined group: ${group.name}`);
//       });

//       io.emit("users", Object.keys(users));
//     });

//     socket.on("private_message", async ({ to, message }) => {
//       const receiver = users[to];
//       if (!receiver) return;

//       const msg = await Message.create({
//         from: socket.userId,
//         to: receiver.userId,
//         message,
//         isGroup: false,
//         timestamp: new Date(),
//       });

//       io.to(receiver.socketId).emit("private_message", {
//         from: socket.username,
//         message,
//         timestamp: msg.timestamp,
//         id: msg._id.toString(),
//       });

//       socket.emit("private_message_sent", {
//         to,
//         message,
//         timestamp: msg.timestamp,
//         id: msg._id.toString(),
//       });
//     });

//     socket.on("create_group", async ({ name, members, creator }) => {
//       try {
//         const existing = await Group.findOne({ name });
//         if (existing) return;

//         await Group.create({ name, members, admins: [creator] });

//         members.forEach((member) => {
//           const memberInfo = users[member];
//           if (memberInfo) {
//             const memberSocket = io.sockets.sockets.get(memberInfo.socketId);
//             memberSocket?.join(name);
//             console.log(`${member} joined new group: ${name}`);
//             io.to(memberInfo.socketId).emit("group_created", { name, members, admins: [creator] });
//           }
//         });
//       } catch (err) {
//         console.error("Error creating group:", err);
//       }
//     });

//     socket.on("send_group_message", async ({ group, message, from }) => {
//       try {
//         const groupDoc = await Group.findOne({ name: group });
//         if (!groupDoc) return;

//         const sender = await User.findOne({ username: from });
//         if (!sender) return;

//         const msg = await Message.create({
//           from: sender._id,
//           to: groupDoc._id,
//           message,
//           isGroup: true,
//           timestamp: new Date(),
//         });

//         io.to(group).emit("group_message", {
//           group,
//           message,
//           from,
//           timestamp: msg.timestamp,
//           id: msg._id.toString(),
//         });
//       } catch (err) {
//         console.error("Error sending group message:", err);
//       }
//     });

//     socket.on("leave_group", async ({ group, username }) => {
//       try {
//         const groupDoc = await Group.findOne({ name: group });
//         if (!groupDoc) return;

//         if (!groupDoc.members.includes(username)) return;

//         groupDoc.members = groupDoc.members.filter((member) => member !== username);
//         groupDoc.admins = groupDoc.admins.filter((admin) => admin !== username);

//         if (groupDoc.members.length === 0) {
//           await Group.deleteOne({ name: group });
//         } else {
//           await groupDoc.save();
//         }

//         socket.leave(group);
//         console.log(`${username} left group: ${group}`);

//         io.to(group).emit("group_updated", {
//           name: group,
//           members: groupDoc.members.length > 0 ? groupDoc.members : null,
//           admins: groupDoc.members.length > 0 ? groupDoc.admins : null,
//           left: username,
//         });

//         io.to(socket.id).emit("group_left", { name: group });
//       } catch (err) {
//         console.error("Error leaving group:", err);
//       }
//     });

//     socket.on("add_member", async ({ group, username, requester }) => {
//       try {
//         const groupDoc = await Group.findOne({ name: group });
//         if (!groupDoc) return;

//         if (!groupDoc.admins.includes(requester)) return;
//         if (groupDoc.members.includes(username)) return;

//         const user = await User.findOne({ username });
//         if (!user) return;

//         groupDoc.members.push(username);
//         await groupDoc.save();

//         const memberInfo = users[username];
//         if (memberInfo) {
//           const memberSocket = io.sockets.sockets.get(memberInfo.socketId);
//           memberSocket?.join(group);
//           console.log(`${username} added to group: ${group}`);
//           io.to(memberInfo.socketId).emit("group_created", {
//             name: group,
//             members: groupDoc.members,
//             admins: groupDoc.admins,
//           });
//         }

//         io.to(group).emit("group_updated", {
//           name: group,
//           members: groupDoc.members,
//           admins: groupDoc.admins,
//           added: username,
//         });
//       } catch (err) {
//         console.error("Error adding member:", err);
//       }
//     });

//     socket.on("remove_member", async ({ group, username, requester }) => {
//       try {
//         const groupDoc = await Group.findOne({ name: group });
//         if (!groupDoc) return;

//         if (!groupDoc.admins.includes(requester)) return;
//         if (!groupDoc.members.includes(username)) return;

//         groupDoc.members = groupDoc.members.filter((member) => member !== username);
//         groupDoc.admins = groupDoc.admins.filter((admin) => admin !== username);

//         if (groupDoc.members.length === 0) {
//           await Group.deleteOne({ name: group });
//         } else {
//           await groupDoc.save();
//         }

//         const memberInfo = users[username];
//         if (memberInfo) {
//           const memberSocket = io.sockets.sockets.get(memberInfo.socketId);
//           memberSocket?.leave(group);
//           console.log(`${username} removed from group: ${group}`);
//           io.to(memberInfo.socketId).emit("group_left", { name: group });
//         }

//         io.to(group).emit("group_updated", {
//           name: group,
//           members: groupDoc.members.length > 0 ? groupDoc.members : null,
//           admins: groupDoc.members.length > 0 ? groupDoc.admins : null,
//           removed: username,
//         });
//       } catch (err) {
//         console.error("Error removing member:", err);
//       }
//     });

//     socket.on("assign_admin", async ({ group, username, requester }) => {
//       try {
//         const groupDoc = await Group.findOne({ name: group });
//         if (!groupDoc) return;

//         if (!groupDoc.admins.includes(requester)) return;
//         if (!groupDoc.members.includes(username)) return;
//         if (groupDoc.admins.includes(username)) return;

//         groupDoc.admins.push(username);
//         await groupDoc.save();

//         io.to(group).emit("group_updated", {
//           name: group,
//           members: groupDoc.members,
//           admins: groupDoc.admins,
//           newAdmin: username,
//         });
//       } catch (err) {
//         console.error("Error assigning admin:", err);
//       }
//     });

//     socket.on("remove_admin", async ({ group, username, requester }) => {
//       try {
//         const groupDoc = await Group.findOne({ name: group });
//         if (!groupDoc) return;

//         if (!groupDoc.admins.includes(requester)) return;
//         if (!groupDoc.admins.includes(username)) return;
//         if (username === requester) return;
//         if (!groupDoc.members.includes(username)) return;

//         groupDoc.admins = groupDoc.admins.filter((admin) => admin !== username);
//         await groupDoc.save();

//         io.to(group).emit("group_updated", {
//           name: group,
//           members: groupDoc.members,
//           admins: groupDoc.admins,
//           removedAdmin: username,
//         });
//       } catch (err) {
//         console.error("Error removing admin:", err);
//       }
//     });

//     socket.on("typing", ({ to, group }) => {
//       if (group) {
//         io.to(group).emit("typing", { username: socket.username, group });
//       } else if (to && users[to]) {
//         io.to(users[to].socketId).emit("typing", { username: socket.username, from: socket.username });
//       }
//     });

//     socket.on("stop_typing", ({ to, group }) => {
//       if (group) {
//         io.to(group).emit("stop_typing", { username: socket.username, group });
//       } else if (to && users[to]) {
//         io.to(users[to].socketId).emit("stop_typing", { username: socket.username, from: socket.username });
//       }
//     });

//     socket.on("disconnect", () => {
//       if (socket.username) {
//         delete users[socket.username];
//         io.emit("users", Object.keys(users));
//       }
//       console.log("User disconnected");
//     });
//   });
// };

// module.exports = setupSocket;
const Group = require("../models/Group");
const Message = require("../models/Message");
const User = require("../models/User");

const setupSocket = (io) => {
  const users = {};

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join", async (username) => {
      const user = await User.findOne({ username });
      if (!user) return;

      // Update lastSeen on connect
      user.lastSeen = new Date();
      await user.save();

      socket.username = username;
      socket.userId = user._id;

      users[username] = { socketId: socket.id, userId: user._id };

      const userGroups = await Group.find({ members: username });
      userGroups.forEach((group) => {
        socket.join(group.name);
        console.log(`${username} joined group: ${group.name}`);
      });

      // Emit online status and lastSeen to all relevant users
      io.emit("users", Object.keys(users));
      io.emit("online_status", {
        username,
        isOnline: true,
        lastSeen: user.lastSeen,
      });
    });

    socket.on("private_message", async ({ to, message }) => {
      const receiver = users[to];
      if (!receiver) return;

      const msg = await Message.create({
        from: socket.userId,
        to: receiver.userId,
        message,
        isGroup: false,
        timestamp: new Date(),
        seen: false, // Initialize as unseen
      });

      io.to(receiver.socketId).emit("private_message", {
        from: socket.username,
        message,
        timestamp: msg.timestamp,
        id: msg._id.toString(),
        seen: msg.seen,
      });

      socket.emit("private_message_sent", {
        to,
        message,
        timestamp: msg.timestamp,
        id: msg._id.toString(),
        seen: msg.seen,
      });
    });

    socket.on("message_seen", async ({ messageId }) => {
      try {
        const message = await Message.findById(messageId);
        if (!message || message.isGroup) return;

        // Only allow the recipient to mark the message as seen
        if (message.to.toString() !== socket.userId.toString()) return;

        message.seen = true;
        await message.save();

        // Notify the sender that the message was seen
        const sender = users[await User.findById(message.from).then(u => u.username)];
        if (sender) {
          io.to(sender.socketId).emit("message_seen", {
            messageId: message._id.toString(),
            seen: true,
          });
        }

        // Confirm to the recipient
        socket.emit("message_seen", {
          messageId: message._id.toString(),
          seen: true,
        });
      } catch (err) {
        console.error("Error marking message as seen:", err);
      }
    });

    socket.on("create_group", async ({ name, members, creator }) => {
      try {
        const existing = await Group.findOne({ name });
        if (existing) return;

        await Group.create({ name, members, admins: [creator] });

        members.forEach((member) => {
          const memberInfo = users[member];
          if (memberInfo) {
            const memberSocket = io.sockets.sockets.get(memberInfo.socketId);
            memberSocket?.join(name);
            console.log(`${member} joined new group: ${name}`);
            io.to(memberInfo.socketId).emit("group_created", { name, members, admins: [creator] });
          }
        });
      } catch (err) {
        console.error("Error creating group:", err);
      }
    });

    socket.on("send_group_message", async ({ group, message, from }) => {
      try {
        const groupDoc = await Group.findOne({ name: group });
        if (!groupDoc) return;

        const sender = await User.findOne({ username: from });
        if (!sender) return;

        const msg = await Message.create({
          from: sender._id,
          to: groupDoc._id,
          message,
          isGroup: true,
          timestamp: new Date(),
          seen: false, // Group messages are initially unseen
        });

        io.to(group).emit("group_message", {
          group,
          message,
          from,
          timestamp: msg.timestamp,
          id: msg._id.toString(),
          seen: msg.seen,
        });
      } catch (err) {
        console.error("Error sending group message:", err);
      }
    });

    socket.on("group_message_seen", async ({ messageId, group }) => {
      try {
        const message = await Message.findById(messageId);
        if (!message || !message.isGroup) return;

        // For group messages, you might track seen status per user
        // For simplicity, we'll mark as seen for the group (extend as needed)
        message.seen = true;
        await message.save();

        io.to(group).emit("group_message_seen", {
          messageId: message._id.toString(),
          seen: true,
          seenBy: socket.username,
        });
      } catch (err) {
        console.error("Error marking group message as seen:", err);
      }
    });

    socket.on("leave_group", async ({ group, username }) => {
      try {
        const groupDoc = await Group.findOne({ name: group });
        if (!groupDoc) return;

        if (!groupDoc.members.includes(username)) return;

        groupDoc.members = groupDoc.members.filter((member) => member !== username);
        groupDoc.admins = groupDoc.admins.filter((admin) => admin !== username);

        if (groupDoc.members.length === 0) {
          await Group.deleteOne({ name: group });
        } else {
          await groupDoc.save();
        }

        socket.leave(group);
        console.log(`${username} left group: ${group}`);

        io.to(group).emit("group_updated", {
          name: group,
          members: groupDoc.members.length > 0 ? groupDoc.members : null,
          admins: groupDoc.members.length > 0 ? groupDoc.admins : null,
          left: username,
        });

        io.to(socket.id).emit("group_left", { name: group });
      } catch (err) {
        console.error("Error leaving group:", err);
      }
    });

    socket.on("add_member", async ({ group, username, requester }) => {
      try {
        const groupDoc = await Group.findOne({ name: group });
        if (!groupDoc) return;

        if (!groupDoc.admins.includes(requester)) return;
        if (groupDoc.members.includes(username)) return;

        const user = await User.findOne({ username });
        if (!user) return;

        groupDoc.members.push(username);
        await groupDoc.save();

        const memberInfo = users[username];
        if (memberInfo) {
          const memberSocket = io.sockets.sockets.get(memberInfo.socketId);
          memberSocket?.join(group);
          console.log(`${username} added to group: ${group}`);
          io.to(memberInfo.socketId).emit("group_created", {
            name: group,
            members: groupDoc.members,
            admins: groupDoc.admins,
          });
        }

        io.to(group).emit("group_updated", {
          name: group,
          members: groupDoc.members,
          admins: groupDoc.admins,
          added: username,
        });
      } catch (err) {
        console.error("Error adding member:", err);
      }
    });

    socket.on("remove_member", async ({ group, username, requester }) => {
      try {
        const groupDoc = await Group.findOne({ name: group });
        if (!groupDoc) return;

        if (!groupDoc.admins.includes(requester)) return;
        if (!groupDoc.members.includes(username)) return;

        groupDoc.members = groupDoc.members.filter((member) => member !== username);
        groupDoc.admins = groupDoc.admins.filter((admin) => admin !== username);

        if (groupDoc.members.length === 0) {
          await Group.deleteOne({ name: group });
        } else {
          await groupDoc.save();
        }

        const memberInfo = users[username];
        if (memberInfo) {
          const memberSocket = io.sockets.sockets.get(memberInfo.socketId);
          memberSocket?.leave(group);
          console.log(`${username} removed from group: ${group}`);
          io.to(memberInfo.socketId).emit("group_left", { name: group });
        }

        io.to(group).emit("group_updated", {
          name: group,
          members: groupDoc.members.length > 0 ? groupDoc.members : null,
          admins: groupDoc.members.length > 0 ? groupDoc.admins : null,
          removed: username,
        });
      } catch (err) {
        console.error("Error removing member:", err);
      }
    });

    socket.on("assign_admin", async ({ group, username, requester }) => {
      try {
        const groupDoc = await Group.findOne({ name: group });
        if (!groupDoc) return;

        if (!groupDoc.admins.includes(requester)) return;
        if (!groupDoc.members.includes(username)) return;
        if (groupDoc.admins.includes(username)) return;

        groupDoc.admins.push(username);
        await groupDoc.save();

        io.to(group).emit("group_updated", {
          name: group,
          members: groupDoc.members,
          admins: groupDoc.admins,
          newAdmin: username,
        });
      } catch (err) {
        console.error("Error assigning admin:", err);
      }
    });

    socket.on("remove_admin", async ({ group, username, requester }) => {
      try {
        const groupDoc = await Group.findOne({ name: group });
        if (!groupDoc) return;

        if (!groupDoc.admins.includes(requester)) return;
        if (!groupDoc.admins.includes(username)) return;
        if (username === requester) return;
        if (!groupDoc.members.includes(username)) return;

        groupDoc.admins = groupDoc.admins.filter((admin) => admin !== username);
        await groupDoc.save();

        io.to(group).emit("group_updated", {
          name: group,
          members: groupDoc.members,
          admins: groupDoc.admins,
          removedAdmin: username,
        });
      } catch (err) {
        console.error("Error removing admin:", err);
      }
    });

    socket.on("typing", ({ to, group }) => {
      if (group) {
        io.to(group).emit("typing", { username: socket.username, group });
      } else if (to && users[to]) {
        io.to(users[to].socketId).emit("typing", { username: socket.username, from: socket.username });
      }
    });

    socket.on("stop_typing", ({ to, group }) => {
      if (group) {
        io.to(group).emit("stop_typing", { username: socket.username, group });
      } else if (to && users[to]) {
        io.to(users[to].socketId).emit("stop_typing", { username: socket.username, from: socket.username });
      }
    });

    socket.on("disconnect", async () => {
      if (socket.username) {
        const user = await User.findOne({ username: socket.username });
        if (user) {
          user.lastSeen = new Date();
          await user.save();
        }

        delete users[socket.username];
        io.emit("users", Object.keys(users));
        io.emit("online_status", {
          username: socket.username,
          isOnline: false,
          lastSeen: user?.lastSeen || new Date(),
        });
        console.log(`${socket.username} disconnected`);
      }
    });
  });
};

module.exports = setupSocket;