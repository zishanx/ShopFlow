import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import protect from "./middleware/authMiddleware.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth", protect, authRoutes)
app.use("/api/products", protect, productRoutes)
app.use("/api/order", protect, orderRoutes)
app.use("/api/cart", protect, cartRoutes)

mongoose.connect(process.env.MONGO_URI).then(() => { console.log("Mongo DB Connected") }).catch(err => console.log(err))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})