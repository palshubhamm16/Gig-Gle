import { clerkClient } from "@clerk/clerk-sdk-node"
import { Request, Response } from "express"

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await clerkClient.users.getUser(id)

    res.json({
      id: user.id,
      firstName: user.firstName,
      imageUrl: user.imageUrl,
    })
  } catch (err) {
    console.error("Failed to fetch user", err)
    res.status(500).json({ message: "Error fetching user" })
  }
}
