import express from "express"
import requireAuth from "../middleware/requireAuth.js"
import verifyRoles from "../middleware/verifyRoles.js"
import ROLE_LIST from "../config/rolesList.js"
import UsersService from "../services/UsersService.js"

const router = express.Router()


export default router;
