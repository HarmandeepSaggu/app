const express = require("express");
const cookieParser = require('cookie-parser');
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/groupRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require('./routes/messageRoutes');
const setupSocket = require("./controllers/socketController");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://app-frontend-u0dt.onrender.com",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ origin: "https://app-frontend-u0dt.onrender.com", credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/users", userRoutes);
app.use('/api/messages', messageRoutes);


// Connect to MongoDB
connectDB();

// Setup Socket.IO
setupSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
