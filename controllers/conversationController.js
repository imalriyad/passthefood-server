const Conversation = require("../models/conversation");
const Message = require("../models/message");

const updateConversation = async (
  senderId,
  receiverId,
  lastMessageText,
  senderName,
  senderAvatar,
  receiverName,
  receiverAvatar
) => {

  
  try {
    let existingConversation = await Conversation.findOne({
      $and: [
        { "participants.userId": senderId },
        { "participants.userId": receiverId },
      ],
    });

    if (existingConversation) {
      existingConversation.lastMessage = lastMessageText;
      existingConversation.lastMessageTime = Date.now();
      await existingConversation.save();
    } else {
      const newConversation = new Conversation({
        participants: [
          {
            userId: senderId,
            name: senderName,
            avatar: senderAvatar,
            isReciver: false,
          },
          {
            userId: receiverId,
            name: receiverName,
            avatar: receiverAvatar,
            isReciver: true,
          },
        ],
        lastMessage: lastMessageText,
        lastMessageTime: Date.now(),
      });
      await newConversation.save();
      existingConversation = newConversation;
    }

    const newMessage = new Message({
      conversationId: existingConversation._id,
      senderId,
      receiverId,
      text: lastMessageText,
      avatar: senderAvatar,
      senderName,
      time: Date.now(),
    });
    await newMessage.save();

    return {
      success: true,
      conversation: existingConversation,
      message: newMessage,
    };
  } catch (error) {
    console.error("Error updating or creating conversation:", error);
    return {
      success: false,
      message: "Error processing your request",
      error: error.message,
    };
  }
};

// create and update conversation
const createConversation = async (req, res) => {
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
};

// Get all messages and conversation
const getConversationsAndMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await Conversation.find({
      "participants.userId": userId,
    }).lean();

    if (!conversations || conversations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No conversations found for this user.",
      });
    }

    const conversationIds = conversations.map(
      (conversation) => conversation._id
    );

    const messages = await Message.find({
      conversationId: { $in: conversationIds },
    }).sort({ time: -1 });

    res.status(200).json({
      success: true,
      conversations,
      messages,
    });
  } catch (error) {
    console.error("Error fetching conversations and messages:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching conversations and messages.",
      error: error.message,
    });
  }
};

module.exports = { getConversationsAndMessages, createConversation };
