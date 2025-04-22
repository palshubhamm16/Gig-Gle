// src/models/Conversation.ts
import mongoose, { Schema, model, models, Document } from "mongoose";

// Conversation Schema
const ConversationSchema = new Schema(
  {
    gigId: { type: Schema.Types.ObjectId, ref: "Gig" }, // Optional field to reference a gig
    isActive: { type: Boolean, default: true }, // Flag to track if conversation is active
    participants: [{ type: mongoose.Types.ObjectId, ref: "Participant" }], // Track participants by reference
  },
  { timestamps: true }
);

// TypeScript interface for the Conversation model
export interface ConversationDocument extends Document {
  gigId: mongoose.Types.ObjectId | null;
  isActive: boolean;
  participants: mongoose.Types.ObjectId[];
}

export const Conversation = models.Conversation || model<ConversationDocument>("Conversation", ConversationSchema);
