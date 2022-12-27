import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  fullName: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 1000,
    },
    Admin: Number,
  },
  hasPaid: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true})

export const UserModel = mongoose.model('accessTokens', userSchema, 'accessTokens');
