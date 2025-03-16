// models/Document.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  fileName: string;
  fileSize: number;
  fileType: string; 
  fileUrl?: string; // If you store files in cloud storage
  isAnalyzed: boolean;
  type: 'book' | 'play' | 'poem' | 'essay' | 'other';
  author?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    fileName: {
      type: String,
      required: [true, 'File name is required']
    },
    fileSize: {
      type: Number,
      required: [true, 'File size is required']
    },
    fileType: {
      type: String,
      required: [true, 'File type is required'],
      default: 'application/pdf'
    },
    fileUrl: {
      type: String
    },
    isAnalyzed: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: [true, 'Document type is required'],
      enum: ['book', 'play', 'poem', 'essay', 'other'],
      default: 'book'
    },
    author: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Check if model exists before creating a new one
const Document = mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);

export default Document;