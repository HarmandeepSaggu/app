// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// const register = async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, email, password: hashed });
//     res.status(201).json({ message: "Registered successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: "Invalid credentials" });

//     res.json({ username: user.username, email: user.email });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// const logout = async (req, res) => {
//   try {
//     // If using sessions, destroy the session
//     if (req.session) {
//       req.session.destroy((err) => {
//         if (err) {
//           return res.status(500).json({ error: "Failed to logout" });
//         }
//         res.status(200).json({ message: "Logged out successfully" });
//       });
//     } else {
//       // For token-based auth (e.g., JWT), the client handles token removal
//       res.status(200).json({ message: "Logged out successfully" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// module.exports = { register, login, logout};

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use environment variable in production

// Register
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login: Set JWT in HTTP-only cookie
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "10m" });

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,         // REQUIRED for cross-site cookies on HTTPS (Render uses HTTPS)
      sameSite: "None",     // REQUIRED for cross-site cookies
      maxAge: 10 * 60 * 1000, // 10 minutes
    });

    res.status(200).json({
      message: "Login successful",
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout: Clear the cookie
const logout = async (req, res) => {
  res.clearCookie("token", {
     httpOnly: true,
     secure: true,
     sameSite: "None",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };
