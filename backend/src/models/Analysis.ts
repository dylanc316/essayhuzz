import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalysis extends Document {
  title: string;
  documentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content: string;
  type: 'character' | 'theme' | 'summary' | 'essay' | 'other';
  status: 'draft' | 'completed' | 'archived';
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AnalysisSchema = new Schema<IAnalysis>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    documentId: {
      type: Schema.Types.ObjectId,
      ref: 'Document',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    type: {
      type: String,
      enum: ['character', 'theme', 'summary', 'essay', 'other'],
      default: 'essay',
    },
    status: {
      type: String,
      enum: ['draft', 'completed', 'archived'],
      default: 'draft',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAnalysis>('Analysis', AnalysisSchema); 