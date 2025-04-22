import express from "express"
import { getUserById } from "../controllers/user"

const router = express.Router()

router.get("/:id", getUserById)

export default router
