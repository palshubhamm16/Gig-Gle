import mongoose, { Schema, model, models } from "mongoose"

const MessageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    senderId: { type: String, required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Message = models.Message || model("Message", MessageSchema)
