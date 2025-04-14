import express from "express";
import cloudinary from "../utils/cloudinary";
import multer from "multer";
import { Readable } from "stream";

const router = express.Router();

// Setup multer memory storage with PDF-only filter
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "file"));
    }
  },
});

router.post("/pdf", upload.single("file"), (req, res) => {
  (async () => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No file uploaded or file type not supported" });
      }

      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "gigfin-pdfs", // updated folder
          resource_type: "raw", // required for PDF
          public_id: file.originalname.split(".")[0], // optional: use file name without extension
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary error:", error);
            return res.status(500).json({ message: "Upload failed" });
          }
          res.status(200).json({ fileUrl: result?.secure_url });
        }
      );

      bufferStream.pipe(uploadStream);
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ message: "Something went wrong" });
    }
  })();
});

export default router;
