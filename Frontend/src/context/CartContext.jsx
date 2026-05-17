import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../utils/api.js"

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const { user } = useAuth()

    useEffect(() => {
        const getCart = async () => {
            if (user) {
                const res = await api.get('/cart');
                setCart(res.data)
            }
        }
        getCart()
    }, [user])

    const addtoCart = async(data)=>{
        const res = await api.post('/cart/add',data)
        setCart(res.data.items)
    }

    const removeFromCart = async(product)=>{
        await api.delete('/cart/remove', product)
    }

    const updateQuanitiy = async(product)=>{
        await api.put('/cart/update',product)
    }
    return (
        <CartContext.Provider value={{ cart, setCart, addtoCart,removeFromCart }}>{children}</CartContext.Provider>
    )
}
export function useCart() {
    return useContext(CartContext)

}