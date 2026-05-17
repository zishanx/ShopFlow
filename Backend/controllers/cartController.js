import Cart from "../models/Cart.js"

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })

        if (!cart) {
            return res.status(200).json({ items: [] })
        }

        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addToCart = async (req, res) => {
    try {
        const { product, name, image, price, quantity } = req.body
        console.log('1 - destructured')

        let cart = await Cart.findOne({ user: req.user._id })
        console.log('2 - cart found', cart)

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] })
            console.log('3 - new cart created')
        }

        const existingItem = cart.items.find(item => item.product.toString() === product)
        console.log('4 - existingItem', existingItem)

        if (existingItem) {
            existingItem.quantity += 1
        } else {
            cart.items.push({ product, name, image, price, quantity })
        }

        await cart.save()
        console.log('5 - saved')

        res.status(200).json(cart)
    } catch (err) {
        console.log('ERROR', err.message)
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
        const { product, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        const updatingItem = cart.items.find(item => item.product.toString() === product);

        updatingItem.quantity = quantity;

        await cart.save()

        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}