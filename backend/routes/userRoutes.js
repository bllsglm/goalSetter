import express from "express"
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {registerUser, logoutUser, authUser, updateUser} from '../controllers/userController.js'

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser )
router.put('/profile', protect, updateUser)


export default router