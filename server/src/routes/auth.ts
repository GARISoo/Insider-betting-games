import express from "express"
import { RouterHandler } from "../types.js"
import requireAuth from "../middleware/requireAuth.js"
import UsersService from "../services/UsersService.js"

const router = express.Router()

const isAuthorized: RouterHandler = async (req, res) => {
    const { _id } = req.user;

    try {
        res.send({
            data: _id,
            status: 'success',
            message: 'Authorized!',
        });
    } catch (error) {
        res.send({
            data: null,
            status: 'error',
            message: error.message,
        });
    }
}

const handleLogout: RouterHandler = async (req, res) => {
    const { token } = req.user

    try {
        await UsersService.logout({ token })

        res.clearCookie('accessCookie')

        res.send({
            data: null,
            status: 'success',
            message: 'User logged out successfully',
        })
    } catch (error) {
        res.send({
            data: null,
            status: 'error',
            message: error.message,
        })
    }
}

const handleLogin: RouterHandler = async (req, res) => {
    const { username, password } = req.body
    const userAgent = req.headers['user-agent'] || 'local placeholder';
    
    try {
        const token = await UsersService.login({ username, password, userAgent })
        
        res.cookie('accessCookie', `Bearer ${token}`, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
        })

        res.send({
            data: null,
            status: 'success',
            message: 'User logged in successfully',
        })
    } catch (error) {
        res.send({
            data: null,
            status: 'error',
            message: error.message,
        })
    }
}

router.get('/', requireAuth, isAuthorized)
router.post('/logout', requireAuth, handleLogout)
router.post("/login", handleLogin)

export default router;
