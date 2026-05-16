import express from "express"

import { getCart, addToCart, removeFromCart, updateQuantity } from "../controllers/cartController.js"

const router = express.Router();

router.get('/',getCart)

router.post('/add',addToCart)

router.delete('/remove',removeFromCart)

router.put('/update',updateQuantity)

export default router