import { Request, Response, Router } from "express";
import Admin from "../models/admin";

const router = Router();

// POST /api/auth/check-admin
router.post("/check-admin", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    console.log("📥 Email received:", email);

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    // Case-insensitive match, trims whitespace
    const admin = await Admin.findOne({ email: new RegExp(`^${email.trim()}$`, "i") });

    console.log("🔍 Admin found:", admin);

    if (admin) {
      res.json({ isAdmin: true, location: admin.location, type: admin.type });
    } else {
      res.json({ isAdmin: false });
    }
  } catch (error) {
    console.error("❌ Error checking admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// (Optional) Debug route to list all admins
router.get("/debug-admins", async (_req: Request, res: Response) => {
  try {
    const admins = await Admin.find({});
    res.json(admins);
  } catch (error) {
    console.error("❌ Error fetching admins:", error);
    res.status(500).json({ message: "Error fetching admins" });
  }
});

export default router;
