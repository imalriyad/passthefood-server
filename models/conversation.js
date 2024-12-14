const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        default: "",
      },
    },
  ],
  lastMessage: {
    type: String,
    default: "",
  },
  lastMessageTime: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
