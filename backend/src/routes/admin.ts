/*import express, { Request, Response, NextFunction } from "express";
import Report from "../models/reports";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

// Extend Express Request type to include `user`
interface AuthRequest extends Request {
  user?: { _id: string; email: string; campus: string };
}

// Get reports for the admin's campus
router.get(
  "/admin/reports",
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authReq = req as AuthRequest; // Type assertion

      if (!authReq.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const adminCampus = authReq.user.campus;
      const reports = await Report.find({ campus: adminCampus });

      res.status(200).json(reports);
    } catch (err) {
      next(err); // Forward errors properly
    }
  }
);

export default router;
*/