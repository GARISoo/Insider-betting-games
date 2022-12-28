import { UserModel } from "../models/user.js"
import { Request, Response, NextFunction } from 'express'

type Role = 'Admin' | 'moderator' | 'User';

type RoleMiddleware = (req: Request, res: Response, next: NextFunction) => void

const verifyRoles = (...allowedRoles: Role[] | number[]) => {
  const verify: RoleMiddleware = (req, res, next) => {
    const _id = req.user._id
    const roleArray = [...allowedRoles]

    try {
      UserModel.findById(_id).then((user) => {
        if (
          user &&
          Object.values(user.roles).some((role) => roleArray.includes(role))
        ) {
          next()
        } else {
          res.status(401).json({ error: "You are not authorized to do this" })
        }
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  return verify
}

export default verifyRoles
