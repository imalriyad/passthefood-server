require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

// Routes
const donationRoute = require("./routes/donationRoute");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000,
  pingInterval: 25000, 
});


// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/v1/", donationRoute, userRoute, messageRoute);

// inital socket conection setup
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Join a room based on the user's MongoDB ID
  socket.on("joinRoom", (userId) => {
    if (userId) {
      socket.join(userId); // Join room with MongoDB userId
      console.log(`User with MongoDB ID ${userId} joined room ${userId}`);
    } else {
      console.error("User ID is missing. Unable to join room.");
    }
  });

  // Handle sending messages
  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, text, time, avatar, senderName } = data;

    if (receiverId) {
      io.to(receiverId).emit("receiveMessage", {
        senderId,
        text,
        time,
        avatar,
        senderName,
        receiverId,
      });

     
    } else {
      console.error("Receiver ID is missing. Message not sent.");
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});




app.get("/", (req, res) => {
  res.send({ message: "passthefood server running..." });
});

server.listen(port, () => {
  console.log("passthefood server running on port", port);
});

module.exports = app;
