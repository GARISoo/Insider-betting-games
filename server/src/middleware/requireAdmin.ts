import jwt from 'jsonwebtoken'
import { UserModel } from "../models/user.js"
import { MiddlewareHandler, User } from "../types.js"

const requireAdmin: MiddlewareHandler = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" })
  }

  const token = authorization.split(" ")[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET) as { _id: string }

    req.user = await UserModel.findById(_id) as User

    if (req.user.roles.Admin) {
      next()
    } else {
      return res.status(401).json({ error: "Request is not authorized" })
    }
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" })
  }
};

export default requireAdmin;
