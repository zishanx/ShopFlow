import Order from "../models/Order.js"

export const createOrder = async (req, res) => {

    try {
        const user = req.user.userId
        const { items, totalPrice } = req.body;
        const saveOrder = await Order.create({ user, items, totalPrice });
        res.status(201).json(saveOrder)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

