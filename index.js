const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const donationRoute = require("./routes/donationRoute");
const userRoute = require("./routes/userRoute");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});



// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/v1/", donationRoute, userRoute);







// Real-time communication
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a room based on user ID
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room ${userId}`);
  });

  // Handle sending messages
  socket.on("sendMessage", (data) => {
    const { senderId, receiverId, message } = data;

    // Emit the message to the receiver
    io.to(receiverId).emit("receiveMessage", {
      senderId,
      message,
      timestamp: new Date(),
    });
    console.log(`Message from ${senderId} to ${receiverId}: ${message}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("Socket.io server running on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send({ message: "passthefood server running..." });
});

app.listen(port, () => {
  console.log("passthefood server running on port", port);
});

module.exports = app;
