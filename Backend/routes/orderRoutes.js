import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { createOrder, getAllOrders, getMyOrders, updateOrderStatus } from '../controllers/orderController.js'

const router = express.Router()

router.post('/create', protect, createOrder)

router.get('/get/order', protect, getMyOrders)

router.get('/', protect, getAllOrders)

router.put('/:id', protect, updateOrderStatus)

export default router