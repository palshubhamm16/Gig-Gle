// src/controllers/reportcontroller.ts
/*import { AuthRequest } from "../types";
import { Response } from "express";
import Report from "../models/reports";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import Admin from "../models/admin";

// --- SUBMIT REPORT ---
export const submitReport = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { description, campus, status, category } = req.body;
    const file = req.file;

    if (!req.user) {
      res.status(401).json({ error: "User not authenticated." });
      return;
    }

    const userId = req.user.sub;

    if (!file || !description || !campus) {
      res.status(400).json({ error: "Missing required fields." });
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "reports" },
      async (error, result) => {
        if (error || !result) {
          console.error("Cloudinary upload error:", error);
          res.status(500).json({ error: "Image upload failed." });
          return;
        }

        const newReport = new Report({
          userId,
          imageUrl: result.secure_url,
          description,
          campus,
          status: status || "pending",
          ...(category && { category }), // include category only if it's provided
        });

        await newReport.save();
        res.status(201).json({ message: "Report submitted successfully." });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  } catch (err) {
    console.error("Error submitting report:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};




// --- GET REPORTS BY LOCATION (AND CATEGORY) FOR LOGGED IN ADMIN ---
export const getReportsByAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "User not authenticated." });
      return;
    }

    const { location, category } = req.body;

    if (!location) {
      res.status(400).json({ error: "Location is required." });
      return;
    }

    const filter: Record<string, any> = {
      campus: location, // ✅ Match location directly with 'campus' in report schema
    };

    if (category) {
      filter.category = category;
    }

    const reports = await Report.find(filter).sort({ createdAt: -1});
    res.status(200).json(reports);
  } catch (err) {
    console.error("❌ Error fetching reports:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// --- UPDATE REPORT STATUS ---
export const updateReportStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Report.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      res.status(404).json({ error: "Report not found." });
      return;
    }

    res.status(200).json({ message: "Status updated.", report: updated });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
*/