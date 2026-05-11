import express from "express"
import { getProduct, getProductById, updateProduct, deleteProduct, createProduct } from "../controllers/productController.js"
import protect from "../middleware/authMiddleware.js"
import admin from "../middleware/adminMiddleware.js"


const router = express.Router()

router.get('/', getProduct)

router.get('/:id', getProductById)

router.post('/add', protect, admin, createProduct)

router.put('/:id', protect, admin, updateProduct)

router.delete('/:id', protect, admin, deleteProduct)

export default router