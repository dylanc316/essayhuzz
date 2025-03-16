// models/Analysis.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalysis extends Document {
  userId: mongoose.Types.ObjectId;
  documentId: mongoose.Types.ObjectId;
  type: 'summary' | 'keyPoints' | 'criticalAnalysis' | 'character' | 'theme' | 'quotations' | 'essay';
  content: string;
  title?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const AnalysisSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Document'
    },
    type: {
      type: String,
      required: [true, 'Analysis type is required'],
      enum: ['summary', 'keyPoints', 'criticalAnalysis', 'character', 'theme', 'quotations', 'essay']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    title: {
      type: String
    },
    metadata: {
      type: Object
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
AnalysisSchema.index({ userId: 1, documentId: 1, type: 1 });

// Check if model exists before creating a new one
const Analysis = mongoose.models.Analysis || mongoose.model<IAnalysis>('Analysis', AnalysisSchema);

export default Analysis;