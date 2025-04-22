import { Schema, model, Types, Document } from "mongoose";
import { Conversation } from "./Conversation"; // Import Conversation model

// Participant Schema
const participantSchema = new Schema(
  {
    conversationId: {
      type: Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    userId: { type: String, required: true }, // userId as string (from Clerk)
  },
  { timestamps: true }
);

// Add unique index to prevent duplicate participants in a conversation
participantSchema.index({ conversationId: 1, userId: 1 }, { unique: true });

// TypeScript interface for the Participant model
export interface ParticipantDocument extends Document {
  conversationId: Types.ObjectId; // Simplified type for conversationId
  userId: string;
}

export const Participant = model<ParticipantDocument>("Participant", participantSchema);
