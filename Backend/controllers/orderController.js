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

export const getMyOrders = async (req, res) => {
    try {
        const myOrder = await Order.find({user: req.user.userId})
        res.status(200).json(myOrder)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const getAllOrders = async (req, res) => {
    try{
        const allOrders = await Order.find();
        res.status(200).json(allOrders)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

export const updateOrderStatus = async (req,res) => {
    try{
        const {status} = req.body;
        const updateOrder = await Order.findByIdAndUpdate(req.params.id,{status},{new:true})
        res.status(200).json(updateOrder)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}