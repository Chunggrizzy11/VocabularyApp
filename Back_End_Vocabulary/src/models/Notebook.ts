import mongoose, { Schema, Document } from "mongoose";

export interface INotebook extends Document {
  userId: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const notebookSchema = new Schema<INotebook>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Notebook = mongoose.model<INotebook>("Notebook", notebookSchema);
