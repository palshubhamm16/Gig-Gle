// messages.ts (controller)
import { Request, Response } from "express";
import { Message } from "../models/Message"; // Your Message model
import { Conversation } from "../models/Conversation"; // Assuming you're storing the conversations
import { ObjectId } from "mongoose";

// Handle sending a message
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    const { conversationId, senderId, content } = req.body;
  
    if (!conversationId || !senderId || !content) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
  
    try {
      // Validate the conversation exists
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        res.status(404).json({ error: "Conversation not found" });
        return;
      }
  
      const newMessage = new Message({
        conversationId,
        senderId,
        content,
      });
  
      await newMessage.save();
  
      res.status(200).json(newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

// Handle fetching messages for a conversation

export const getMessagesByConversationId = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 })

    res.status(200).json({ messages })
  } catch (error) {
    console.error("Error fetching messages:", error)
    res.status(500).json({ message: "Failed to fetch messages" })
  }
}
