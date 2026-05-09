import express from "express"
import { getProduct, getProductById, updateProduct, deleteProduct, createProduct } from "../controllers/productController.js"
import protect from "../middleware/authMiddleware.js"


const router = express.Router()

router.get('/', getProduct)

router.get('/:id', getProductById)

router.post('/add', protect, createProduct)

router.put('/:id', protect, updateProduct)

router.delete('/:id', protect, deleteProduct)

export default router