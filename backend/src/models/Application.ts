import mongoose, { Schema, Document, Types } from "mongoose";

export interface IApplication extends Document {
  seeker: string;
  name: string;
  age?: number;
  gender?: string;
  disabilityType?: string;
  gig: Types.ObjectId;
  coverLetter?: string;
  pdf?: string;
  accommodationNeeded?: string;
  status: "applied" | "reviewed" | "interview" | "rejected" | "hired";
  interview?: {
    date: Date;
    message: string;
  };
  startDate?: Date;
  appliedAt: Date;
  updatedAt: Date;
}

const ApplicationSchema: Schema<IApplication> = new Schema<IApplication>(
  {
    seeker: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    disabilityType: { type: String },
    gig: { type: Schema.Types.ObjectId, ref: "Gig", required: true },
    coverLetter: { type: String },
    pdf: { type: String },
    accommodationNeeded: { type: String },
    status: {
      type: String,
      enum: ["applied", "reviewed", "interview", "rejected", "hired"],
      default: "applied",
    },
    interview: {
      date: { type: Date },
      message: { type: String },
    },
    startDate: { type: Date },
  },
  { timestamps: { createdAt: "appliedAt", updatedAt: "updatedAt" } }
);

export default mongoose.models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);
