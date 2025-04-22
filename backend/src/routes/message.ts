// messages.ts (routes)
import express from "express";
import { sendMessage } from "../controllers/messages";
import { getMessagesByConversationId } from "../controllers/messages"; // Import the controller function

const router = express.Router();

router.post("/", sendMessage);
router.get("/:conversationId", getMessagesByConversationId)


export default router;
