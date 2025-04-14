import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    locationType: { type: String, required: true },
    location: { type: String }, // optional
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    type: { type: String, required: true }, // from `gigType` in frontend
    category: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    responsibilities: { type: String, required: true },
    benefits: { type: String, required: true },
    salary: { type: String, required: true },
    hours: { type: String, required: true },
    deadline: { type: String, required: true },
    accommodations: { type: String, required: true },
    flexibleHours: { type: Boolean, required: true },
    assistiveTech: { type: Boolean, required: true },
    userId: { type: String, required: true }
  },
  { timestamps: true } // Optional: adds createdAt and updatedAt fields
);
gigSchema.index({
  title: "text",
  description: "text",
  category: "text",
  company: "text",
  city: "text",
});


export default mongoose.model("Gig", gigSchema);
