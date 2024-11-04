import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
const Nav = (props) => {
   const auth=localStorage.getItem('user');

   const navigate=useNavigate();
    const logout=()=>
    {
     localStorage.clear();   
     navigate('/signup');
    }

    const {cart}= useSelector((state) => state);
  return (
    <div className='w-full fixed z-10'>
       
       <nav className="flex items-center bg-[#F2EDE6] p-2 w-full h-[64px] overflow-hidden">

            <img class="w-8 h-8 mr-2" src="https://cdn.pixabay.com/photo/2023/09/22/15/45/panda-8269336_1280.png" alt="logo"/>
      <div className='flex-1'>

        <span className='text-xl text-white'>Ayush Shop</span>
      </div>
      
      <div className='flex-1'>
        <ul className='flex justify-center space-x-16'>
          <li><Link to="/" className='text-white p-2 rounded-lg  hover:bg-[#977337] '>Products</Link></li>
          <li><Link to="/add" className='text-white p-2 rounded-lg  hover:bg-[#977337]'>AddProducts</Link></li>
          <li><Link to="/cart" className='text-white p-2 rounded-lg  hover:bg-[#977337]'>Cart-{cart.length}</Link></li>
        </ul>
      </div>

      <div className='flex-1 flex justify-end'>
        <ul className='flex space-x-16 p-2 rounded-lg  hover:bg-[#977337]'>
        <li>  {auth?  <Link onClick={logout} to={'/signup'} >LOGOUT</Link>:  <Link to={'/signup'} >SIGNUP</Link>} </li>
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default Nav
