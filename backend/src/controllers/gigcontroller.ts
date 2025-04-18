import { Request, Response } from "express";
import Gig from "../models/Gig";
import Application from "../models/Application";


// Adjusted to fix Boolean parsing and required `type` field
export const createGig = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      company,
      locationType,
      location,
      country,
      state,
      city,
      gigType, // frontend sends this as gigType
      category,
      description,
      requirements,
      responsibilities,
      benefits,
      salary,
      hours,
      deadline,
      accommodations,
      flexibleHours,
      assistiveTech
    } = req.body;

    const userId = req.headers["user-id"]; // Pulled from Clerk header

    if (!userId) {
      res.status(401).json({ error: "Unauthorized: Missing user ID" });
      return;
    }

    const gig = new Gig({
      title,
      company,
      locationType,
      location,
      country,
      state,
      city,
      type: gigType, // required field mapped from frontend
      category,
      description,
      requirements,
      responsibilities,
      benefits,
      salary,
      hours,
      deadline,
      accommodations,
      flexibleHours: flexibleHours === "on" || flexibleHours === true,
      assistiveTech: assistiveTech === "on" || assistiveTech === true,
      userId
    });

    await gig.save();
    res.status(201).json(gig);
  } catch (error) {
    console.error("Error creating gig:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getAllGigs = async (req: Request, res: Response): Promise<void> => {
  try {
    const gigs = await Gig.find().sort({ createdAt: -1 });
    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching gigs" });
  }
};

// Add this below createGig and getAllGigs in gigcontroller.ts
export const getUserGigs = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.headers["user-id"];

    if (!userId) {
      res.status(401).json({ error: "Unauthorized: Missing user ID" });
      return;
    }

    const gigs = await Gig.find({ userId }).sort({ createdAt: -1 }).lean();

    const gigsWithApplicationCounts = await Promise.all(
      gigs.map(async (gig) => {
        const applicationsCount = await Application.countDocuments({ gig: gig._id });
        const newApplications = await Application.countDocuments({
          gig: gig._id,
          status: "applied",
        });

        return {
          ...gig,
          applicationsCount,
          newApplications,
        };
      })
    );

    res.status(200).json(gigsWithApplicationCounts);
  } catch (error) {
    console.error("Error fetching user's gigs:", error);
    res.status(500).json({ error: "Error fetching user's gigs" });
  }
};



export const getGigById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const gig = await Gig.findById(id);
    if (!gig) {
      res.status(404).json({ message: "Gig not found" });
      return; // Ensure we exit early
    }
    res.json(gig);
  } catch (error) {
    console.error("Error fetching gig:", error); // Log for better debugging
    res.status(500).json({ message: "Server error", error });
  }
};

export const getFilteredGigs = async (req: Request, res: Response) => {
  try {
    const {
      country,
      state,
      city,
      category,
      types,
      sort,
      search,
    } = req.query;

    const filters: any = {};

    // Location filters
    if (country) filters.country = country;
    if (state) filters.state = state;
    if (city) filters.city = city;

    // Category filter
    if (category) filters.category = category;

    // Job type multi-select
    if (types) {
      const typeArray = (types as string).split(",");
      filters.type = { $in: typeArray };
    }

    // Text search
    if (search) {
      const searchRegex = new RegExp(search as string, "i");
      filters.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { company: searchRegex },
        { city: searchRegex },
      ];
    }

    // Sort logic
    let sortOption: any = {};
    switch (sort) {
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      case "relevance":
        sortOption = search ? { score: { $meta: "textScore" } } : { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Apply MongoDB text index if using relevance
    let gigs;
    if (sort === "relevance" && search) {
      gigs = await Gig.find(
        { ...filters, $text: { $search: search as string } },
        { score: { $meta: "textScore" } }
      ).sort(sortOption);
    } else {
      gigs = await Gig.find(filters).sort(sortOption);
    }

    res.status(200).json(gigs);
  } catch (error) {
    console.error("Error filtering gigs:", error);
    res.status(500).json({ error: "Server error" });
  }
};
