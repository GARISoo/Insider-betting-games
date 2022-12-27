import allowedOrigins from "../config/allowedOrigins.js"
import {Request, Response, NextFunction} from 'express'

type CredentialsMiddleware = (req: Request, res: Response, next: NextFunction) => void

const credentials: CredentialsMiddleware = (req, res, next) => {
  const origin = req.headers.origin

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", String(true))
  }

  next();
}

export default credentials;
