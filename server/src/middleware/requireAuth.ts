import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.js'
import AccessTokenService from '../services/AccessTokenService.js'
import { MiddlewareHandler, JwtError, User } from "../types.js"

const requireAuth: MiddlewareHandler = async (req, res, next) => {
  const { cookies, headers } = req
  const { accessCookie } = cookies

  const unauthorizedResponse = {
    data: false,
    status: 'forbidden',
    message: 'Unauthorized!',
  }

  const token = accessCookie ? accessCookie.split(' ')[1] : null

  const accessTokenSecret = process.env.SECRET

  if (!token) {
    res.send(unauthorizedResponse)

    return;
  }

  jwt.verify(token, accessTokenSecret, async (jwtErr: JwtError, user: User | undefined) => {
    try {
      if (jwtErr) throw jwtErr

      let { _id } = user
      const userAgent = headers['user-agent'] ?? 'Unknown'

      const result = await AccessTokenService.refreshToken({ userId: _id, userAgent })

      const { updatedToken } = result

      res.cookie('accessCookie', `Bearer ${updatedToken}`, {
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      })

      user = await UserModel.findOne({ _id, deleted: false })

      req.user = {
        _id,
        token: updatedToken,
        username: user.username,
        name: user.name,
        surname: user.surname,
      };

      next();
    } catch (err) {
      res.send(unauthorizedResponse)
    };
  });
};

export default requireAuth;
