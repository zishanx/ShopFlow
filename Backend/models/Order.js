import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, default: "pending" },
    paymentStatus: { type: String, required: true, default: "pending" },
    createdAt: { type: Date, required: true, default: Date.now() }

})

const Order = mongoose.model('Order', orderSchema)

export default Order