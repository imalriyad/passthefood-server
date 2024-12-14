const express = require("express");
const router = express.Router();
const {
  updateConversation,
  getConversationsAndMessages,
} = require("../controllers/conversationController");

router.post("/update-conversation", async (req, res) => {
  const {
    senderId,
    receiverId,
    lastMessageText,
    senderName,
    senderAvatar,
    receiverName,
    receiverAvatar,
  } = req.body;

  try {
    const response = await updateConversation(
      senderId,
      receiverId,
      lastMessageText,
      senderName,
      senderAvatar,
      receiverName,
      receiverAvatar
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing your request",
      error: error.message,
    });
  }
});

router.get("/get-conversations-messages/:userId", getConversationsAndMessages);
module.exports = router;
