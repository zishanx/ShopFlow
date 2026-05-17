import express from "express"
import protect from "../middleware/authMiddleware.js";

import { getCart, addToCart, removeFromCart, updateQuantity } from "../controllers/cartController.js"

const router = express.Router();

router.get('/', protect, getCart)

router.post('/add', protect, addToCart)

router.delete('/remove', protect, removeFromCart)

router.put('/update', protect, updateQuantity)

export default router