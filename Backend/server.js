import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/order",orderRoutes)

mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("Mongo DB Connected")}).catch(err => console.log(err))

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})