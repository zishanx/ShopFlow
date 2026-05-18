import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../utils/api.js"
import toast from 'react-hot-toast'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const { user } = useAuth()

    useEffect(() => {

        const getCart = async () => {
            console.log(user)

            if (user) {
                const res = await api.get('/cart');
                setCart(res.data.items)
            }
        }
        getCart()
    }, [user])

    const addToCart = async (data) => {
        const res = await api.post('/cart/add', data)
        setCart(res.data.items)
        toast.sucess("Added to cart!")
    }

    const removeFromCart = async (product) => {
        const res = await api.delete('/cart/remove', product)
        setCart(res.data.items)
    }

    const updateQuantity = async (product, quantity) => {
        const res = await api.put('/cart/update', { product, quantity })
        setCart(res.data.items)
    }
    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity }}>{children}</CartContext.Provider>
    )
}
export function useCart() {
    return useContext(CartContext)

}