import { UserModel } from '../models/userModel.js'

class UsersService {
  static async getAllUsers() {
    const users = await UserModel.find({ deleted: false })

    if (!users) {
      throw new Error("No users found")
    }

    return { users }
  }

  static async login({ email, password, userAgent }) {
    
  }
}

export default UsersService
