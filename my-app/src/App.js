import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from './component/Nav'
import Signup from './component/Signup'
import PrivateComponent from './component/PrivateComponent'
import Login from './component/Login'
import AddProduct from './component/AddProduct'
import Products from './component/Products'
import Cart from './component/Cart'
import Update from './component/Update'

const App = (props) => {
  return (

    <div>
     <BrowserRouter>
     <Nav/>
     <Routes>

      <Route element={<PrivateComponent/>}>

      <Route path='/' element={<Products/>} />
      <Route path='/add' element={<AddProduct/>} />
      <Route path='/update/:id' element={<Update/>} />
      <Route path='/cart' element={<Cart />}/>
      <Route path='/profile' element={<h1>profile</h1>} />
      </Route>
      
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
     </Routes>
     </BrowserRouter> 
    </div>
  )
}

export default App
