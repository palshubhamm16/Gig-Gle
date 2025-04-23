import express from "express"
import { createGig, getAllGigs, getUserGigs, getGigById, getFilteredGigs, getRandomFeaturedGigs} from "../controllers/gigcontroller";

const router = express.Router()

// Define individual routes correctly
router.post("/gigs", createGig)       // ✅ POST /api/gigs
router.get("/gigs", getFilteredGigs)  // 👈 swap this in
router.get("/my-gigs", getUserGigs); // 👈 this line is new
router.get('/gigs/featured', getRandomFeaturedGigs); 
router.get('/gigs/:id', getGigById);


export default router
