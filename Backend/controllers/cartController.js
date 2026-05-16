import Cart from "../models/Cart.js"

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addToCart = async (req, res) => {
    try {
        const { product, name, image, price, quantity } = req.body;

        let cart = await Cart.find({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] })
        }
        const existingItem = cart.items.find(item => item.product.toString() === product)

        if (existingItem) {
            existingItem.quantity += 1
        } else {
            cart.items.push({ product, name, image, price, quantity })
        }
        await cart.save()
        res.status(200).json(cart)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const removeFromCart = async (req, res) => {

    try {
        const { productId } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        cart.items = cart.items.filter(item => item.product.toString() !== productId)

        await cart.save()
        res.status(200).json(cart)
    } catch (err) { res.status(400).json({ error: err.message }) }
}

export const updateQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        const updatingItem = cart.items.find(item => item.product.toString() === productId);

        updatingItem.quantity = quantity;

        await cart.save()

        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}