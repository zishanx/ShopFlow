import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { createOrder, getAllOrders, getMyOrders, updateOrderStatus } from '../controllers/orderController.js'
import admin from '../middleware/adminMiddleware.js'

const router = express.Router()

router.post('/create', protect, createOrder)

router.get('/get/order', protect, getMyOrders)

router.get('/', protect, getAllOrders)

router.put('/:id', protect, admin, updateOrderStatus)

export default router