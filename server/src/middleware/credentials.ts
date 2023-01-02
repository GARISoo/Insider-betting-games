import allowedOrigins from "../config/allowedOrigins.js"
import { MiddlewareHandler } from "../types.js"

const credentials: MiddlewareHandler = (req, res, next) => {
  const origin = req.headers.origin

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", String(true))
  }

  next();
}

export default credentials;
