// models/Token.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  type: 'verification' | 'reset';
  createdAt: Date;
  expiresAt: Date;
}

const TokenSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['verification', 'reset'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Auto-expire after 24 hours
  }
});

// Check if model exists before creating a new one
const Token = mongoose.models.Token || mongoose.model<IToken>('Token', TokenSchema);

export default Token;