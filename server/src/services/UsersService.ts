import { UserModel } from '../models/user.js'
import AccessTokensService from './AccessTokenService.js'
import bcrypt from 'bcrypt'

class UsersService {
  static async signup({ username, password, name, surname }) {
    if (!username || !password || !name || !surname) {
      throw Error('All fields must be filled')
    }

    const weakPassword = password.length < 6 || password.length > 20

    if (weakPassword) {
      throw Error('Password must be between 6 and 20 characters')
    }

    const exists = await UserModel.findOne({ username, deleted: false })

    if (exists) {
      throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await UserModel.create({ username, password: hash, name, surname })

    return user
  }

  static async getAllUsers() {
    const users = await UserModel.find({ deleted: false })

    if (!users) {
      throw new Error("No users found")
    }

    return { users }
  }

  static async login({ username, password, userAgent }) {
    if (!username || !password) {
      throw Error('All fields must be filled')
    }

    const user = await UserModel.findOne({ username, deleted: false })

    if (!user) {
      throw Error("Can't find user with this email")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      throw Error('Incorrect password')
    }

    const { token } = await AccessTokensService.getToken({
      userId: user._id,
      userAgent,
    })

    return token
  }

  static async logout({ token }) {
    await AccessTokensService.deleteToken(token)
  }

  static async deleteUser({ userId }) {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId }, { deleted: true }, { useFindAndModify: false }
    )

    if (!user) {
      throw Error("User not found")
    }

    const { username } = user

    return username
  }
}

export default UsersService
