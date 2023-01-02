import requireAuth from "../middleware/requireAuth.js";
import express from 'express';
import auth from "./auth.js";
import user from "./user.js";

const router = express.Router();

router
  .use("/user", requireAuth, user)
  .use('/auth', auth)

export default router;