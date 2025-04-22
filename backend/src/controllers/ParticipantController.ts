import { Participant } from "../models/Participant";
import { Request, Response, NextFunction } from "express";
import { Conversation } from "../models/Conversation";
import mongoose from "mongoose";

export const createOrGetConversation = async ({
    currentUserId,
    gigPosterId,  // Using gigPosterId instead of otherUserId
    gigId,
}: { currentUserId: string; gigPosterId: string; gigId?: string }): Promise<string> => {
    try {
        // Check if currentUserId and gigPosterId are valid
        if (!currentUserId || !gigPosterId) {
            throw new Error("Missing user IDs");
        }

        // Convert gigId to ObjectId if it's provided and valid
        let convertedGigId: mongoose.Types.ObjectId | null = null;
        if (gigId) {
            if (mongoose.Types.ObjectId.isValid(gigId)) {
                convertedGigId = new mongoose.Types.ObjectId(gigId);
            } else {
                console.warn("Invalid gigId format:", gigId);
            }
        }

        // Step 1: Find all conversations where currentUser is a participant
        const currentUserParticipantConversations = await Participant.find({
            userId: currentUserId,
        });

        const conversationIds = currentUserParticipantConversations.map((p) => p.conversationId);

        // Step 2: Check if gigPosterId is also a participant in any of the same conversations
        const existingParticipant = await Participant.findOne({
            conversationId: { $in: conversationIds },
            userId: gigPosterId,  // Use gigPosterId instead of otherUserId
        });

        // Step 3: If found, return that conversationId
        if (existingParticipant) {
            return existingParticipant.conversationId.toString();
        }

        // Step 4: If not found, create a new conversation
        const newConversation = await Conversation.create({
            gigId: convertedGigId, // Save the converted gigId
            participants: [],
        });

        // Create participants for the new conversation
        const participants = await Participant.create([
            { conversationId: newConversation._id, userId: currentUserId },
            { conversationId: newConversation._id, userId: gigPosterId },  // Use gigPosterId
        ]);

        // Ensure that the participants are correctly saved in the conversation
        newConversation.participants = participants.map((p) => p._id);
        await newConversation.save();

        return newConversation._id.toString();
    } catch (error) {
        console.error("Error in createOrGetConversation:", error);
        throw new Error("Failed to create or fetch conversation");
    }
};


  //get conversations by userId
export const getUserConversationsHandler = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const participants = await Participant.find({ userId }).populate({
      path: "conversationId",
      populate: {
        path: "participants",
        model: "Participant",
      },
    });

    const conversations = participants.map((p) => {
      const conversation = p.conversationId as any;
      return {
        _id: conversation._id,
        gigId: conversation.gigId,
        participants: conversation.participants,
      };
    });

    res.status(200).json({ conversations });
  } catch (error) {
    next(error);
  }
};
