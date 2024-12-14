const express = require("express");
const router = express.Router();
const {
  createConversation,
  getConversationsAndMessages,
} = require("../controllers/conversationController");

// creating conversation
router.post("/create-conversation", createConversation);

router.get("/get-conversations-messages/:userId", getConversationsAndMessages);
module.exports = router;
