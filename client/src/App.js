import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Policy from './Pages/Policy'
import PageNotFound from './Pages/PageNotFound'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'

import axios from 'axios';
import Dashboard from './Pages/user/Dashboard'


import Private from './components/Routes/Private'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import AdminRoute from './components/Routes/AdminRoute'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import CreateCategory from './Pages/Admin/CreateCategory'
import CreateProduct from './Pages/Admin/CreateProduct'
import Users from './Pages/Admin/Users'
import Orders from './Pages/user/Orders'
import Profile from './Pages/user/Profile'
import Products from './Pages/Admin/Products'
import UpdateProduct from './Pages/Admin/UpdateProduct'
import Search from './Pages/Search'
import ProductDetails from './Pages/ProductDetails'
import Categories from './Pages/Categories'
import CategoryProduct from './Pages/CategoryProduct'
import Cart from './Pages/Cart'
import AdminOrders from './Pages/Admin/AdminOrders'

// axios.defaults.baseURL='http://localhost:8000'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search' element={<Search />}/>
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />




        <Route path='/dashboard' element={<Private/>}>
        
            <Route path='user' element={<Dashboard />}/>
            <Route path='user/orders' element={<Orders />}/>
            <Route path='user/profile' element={<Profile />}/>
            

        </Route>

        <Route path='/dashboard' element={<AdminRoute />}>
            <Route path='admin' element={<AdminDashboard />}/>
            <Route path='admin/create-category' element={<CreateCategory />}/>
            <Route path='admin/create-product' element={<CreateProduct />}/>
            <Route path='admin/product/:slug' element={<UpdateProduct />}/>
            <Route path='admin/products' element={<Products />}/>
            <Route path='admin/users' element={<Users />}/>
            <Route path='admin/orders' element={<AdminOrders />}/>
        </Route>
        

        <Route path='/about' element={<About />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />


      </Routes>
    </>
  )
}

export default App
