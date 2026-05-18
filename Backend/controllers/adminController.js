import Order from "../models/Order.js"
import Product from "../models/Product.js"
import User from "../models/User.js"

export const getStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments()
        const totalProducts = await Product.countDocuments()
        const totalUsers = await User.countDocuments()

        const revenueData = await Order.aggregate([
            { $match: { paymentStatus: "paid" } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ])
        const totalRevenue = revenueData[0]?.total || 0
        res.json({ totalOrders, totalProducts, totalUsers, totalRevenue })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}