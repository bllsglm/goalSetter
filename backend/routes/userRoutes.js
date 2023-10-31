import express from "express"
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {registerUser, logoutUser, authUser, updateUser ,getMe} from '../controllers/userController.js';

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser )
router.put('/profile',protect, updateUser)
router.get('/me', protect,getMe)


export default router