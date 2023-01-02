import express from "express"
import { RouterHandler } from "../types.js"
import verifyRoles from "../middleware/verifyRoles.js"
import ROLE_LIST from "../config/rolesList.js"
import UsersService from "../services/UsersService.js"

const router = express.Router()

const getAllUsers: RouterHandler = async (req, res) => {
    try {
        const users = await UsersService.getAllUsers()

        res.send({
            data: users,
            status: 'success',
            message: 'Users listed successfully',
        });
    } catch (error) {
        res.send({
            data: null,
            status: 'error',
            message: error.message,
        });
    }
}

const handleSignup: RouterHandler = async (req, res) => {
    const { username, password, name, surname } = req.body;

    try {
        await UsersService.signup({ username, password, name, surname })

        res.send({
            data: username,
            status: 'success',
            message: `${username} created`,
        });
    } catch (error) {
        res.send({
            data: null,
            status: 'error',
            message: error.message,
        });
    }
}

const handleDeleteUser: RouterHandler = async (req, res) => {
    const { _id } = req.body;

    try {
        const username = await UsersService.deleteUser({ userId: _id })

        res.send({
            data: username,
            status: 'success',
            message: `${username} deleted`,
        });
    } catch (error) {
        res.send({
            data: null,
            status: 'error',
            message: error.message,
        });
    }
}

router.get("/", getAllUsers)
router.post("/signup", verifyRoles(ROLE_LIST.Admin), handleSignup)
router.delete('/delete', verifyRoles(ROLE_LIST.Admin), handleDeleteUser)

export default router;
