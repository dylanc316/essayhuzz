import mongoose from 'mongoose';

interface IToken {
  userId: mongoose.Types.ObjectId;
  token: string;
  type: 'verification' | 'reset';
  createdAt: Date;
}

const TokenSchema = new mongoose.Schema<IToken>({
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
  },
});

export default mongoose.models.Token || mongoose.model<IToken>('Token', TokenSchema);