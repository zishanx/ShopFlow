import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Products from './pages/Product.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import MyOrders from './pages/MyOrders.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ManageProducts from './pages/admin/ManageProducts.jsx'
import ManageOrders from './pages/admin/ManageOrders.jsx'
import Navbar from './components/Navbar.jsx'

export default function App() {
  return (
    <BrowserRouter>

      <Navbar></Navbar>



      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/products' element={<ManageProducts />} />
        <Route path='/admin/orders' element={<ManageOrders />} />
      </Routes>
    </BrowserRouter>
  )
}