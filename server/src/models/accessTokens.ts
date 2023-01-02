import mongoose from 'mongoose';

const { Schema } = mongoose;

const tokenSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  userAgent: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
}, { timestamps: true });

export const TokenModel = mongoose.model('accessTokens', tokenSchema, 'accessTokens');