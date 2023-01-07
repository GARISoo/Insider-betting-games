import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  surname: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    User: Number,
    Admin: Number,
  },
  hasPaid: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true })

export const UserModel = mongoose.model('user', userSchema, 'user');
