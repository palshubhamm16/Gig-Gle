import express from "express";
import { createOrGetConversation, getUserConversationsHandler, } from "../controllers/ParticipantController";

const router = express.Router();

// Just like your application routes
router.post("/create-or-get", async (req, res, next) => {
  try {
	const result = await createOrGetConversation(req.body);
	res.status(200).send(result);
  } catch (error) {
	next(error);
  }
});
router.get("/conversations/:userId", getUserConversationsHandler);

export default router;
