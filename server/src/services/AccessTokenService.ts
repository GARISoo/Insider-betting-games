import jwt from 'jsonwebtoken'
import { TokenModel } from '../models/accessTokens.js'

require('dotenv').config({
  path: '../.env',
})

const accessTokenSecret = process.env.SECRET

class AccessTokensService {
  static async getToken({ userId, userAgent }) {
    const existingAccessToken = await TokenModel.findOne({
      userId,
      userAgent,
    })

    if (!existingAccessToken) {
      const accessToken = await this.createToken({
        userId,
        userAgent,
      })

      if (accessToken) {
        return accessToken
      }
    }

    return existingAccessToken
  }

  static async createToken({ userId, userAgent }) {
    const token = jwt.sign({ userId, userAgent }, accessTokenSecret);

    const newToken = new TokenModel({ userId, userAgent, token });

    const accessToken = await newToken.save();

    return accessToken;
  }

  static async refreshToken({ userId, userAgent }) {
    const dbToken = await TokenModel.findOne({ userId, userAgent })

    if (!dbToken) {
      return null
    }

    return {
      updatedToken: dbToken.token,
    }
  }
  
  static async deleteToken(token: string) {
    TokenModel.deleteOne({ token })
  }
}

export default AccessTokensService
