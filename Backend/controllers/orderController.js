import Order from "../models/Order.js"
import Razorpay from "razorpay"
import crypto from "crypto"

export const createOrder = async (req, res) => {

    try {
        const user = req.user._id
        const { items, totalPrice } = req.body;
        const saveOrder = await Order.create({ user, items, totalPrice });
        res.status(201).json(saveOrder)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const getMyOrders = async (req, res) => {
    try {
        const myOrder = await Order.find({ user: req.user._id }).populate("items.product", "name image")
        res.status(200).json(myOrder)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find().populate("user", "name email")
            .populate("items.product", "name image");
        res.status(200).json(allOrders)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
        res.status(200).json(updateOrder)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}




export const createRazorpayOrder = async (req, res) => {
    try {

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })


        const { amount } = req.body
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        })
        res.status(200).json(order)
    } catch (err) {
        res.status(5000).json({ message: err.message })
    }
}

export const verifyPayment = async (req, res) => {
    try {

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })


        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, totalPrice } = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex")

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment signature" })
        }

        const order = await Order.create({
            user: req.user._id,
            items,
            totalPrice,
            paymentStatus: "paid",
            status: "processing"
        })

        res.status(201).json(order)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}