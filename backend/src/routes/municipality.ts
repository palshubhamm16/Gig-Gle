/*import express from "express";
import Admin from "../models/admin"; // adjust the path if needed

const router = express.Router();

// GET /api/municipality/list
router.get("/list", async (_req, res) => {
  try {
    const municipalities = await Admin.find({ type: "municipality" }).distinct("location");
    res.json(municipalities.map(name => ({ name }))); // shape like [{ name: "TechZone II" }]
  } catch (error) {
    console.error("Error fetching municipality list", error);
    res.status(500).json({ message: "Error fetching municipalities" });
  }
});

export default router;
*/