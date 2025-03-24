import mongoose, { Document, Schema } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  content: string;
  author: string;
  description?: string;
  type: 'novel' | 'play' | 'essay' | 'poem' | 'other';
  tags: string[];
  userId: mongoose.Types.ObjectId;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    author: {
      type: String,
      required: [true, 'Please provide an author'],
      trim: true,
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    type: {
      type: String,
      enum: ['novel', 'play', 'essay', 'poem', 'other'],
      default: 'other',
    },
    tags: {
      type: [String],
      default: [],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for search
DocumentSchema.index({ title: 'text', content: 'text', author: 'text', tags: 'text' });

export default mongoose.model<IDocument>('Document', DocumentSchema); 