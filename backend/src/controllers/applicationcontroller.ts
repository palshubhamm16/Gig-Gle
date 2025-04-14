import { Request, Response } from "express";
import Application from "../models/Application";
import cloudinary from "../utils/cloudinary";
import mongoose from "mongoose";

export const createApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gig, coverLetter, accommodationNeeded } = req.body;
    const resumeFile = req.file;
    const seekerId = req.headers["user-id"] as string;

    if (!resumeFile || !gig || !seekerId) {
      res.status(400).json({ error: "Missing required fields." });
      return;
    }

    // Upload PDF to Cloudinary (as 'raw' file)
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "gigfin-pdfs",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(resumeFile.buffer);
    });

    const application = new Application({
      seeker: seekerId,
      gig,
      pdf: result.secure_url,
      coverLetter: coverLetter || "No cover letter provided.",
      accommodationNeeded: accommodationNeeded || "No accommodation needed.",
      status: "applied",
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Application creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



//get applications by you

export const getUserApplications = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.headers["user-id"]
  
      if (!userId) {
        res.status(401).json({ error: "Unauthorized: Missing user ID" })
        return
      }
  
      const applications = await Application.find({ seeker: userId })
        .populate("gig") // optionally populate gig details
        .sort({ appliedAt: -1 })
  
      res.status(200).json(applications)
    } catch (error) {
      console.error("Error fetching user's applications:", error)
      res.status(500).json({ error: "Error fetching user's applications" })
    }
  }


  //get gigapplications

 
export const getGigApplications = async (req: Request, res: Response): Promise<void> => {
    try {
      const { gigId } = req.params
  
      if (!gigId || !mongoose.Types.ObjectId.isValid(gigId)) {
        res.status(400).json({ error: "Invalid or missing gig ID" })
        return
      }
  
      const applications = await Application.find({ gig: new mongoose.Types.ObjectId(gigId) })
        .populate("seeker") // optional
        .sort({ appliedAt: -1 })
  
      console.log(`Found ${applications.length} applications for gig ${gigId}`)
  
      res.status(200).json(applications)
    } catch (error) {
      console.error("Error fetching applications for gig:", error)
      res.status(500).json({ error: "Error fetching applications for gig" })
    }
  }