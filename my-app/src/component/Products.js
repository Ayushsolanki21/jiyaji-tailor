import React, { useEffect, useState } from 'react';
import {  useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddCart } from './redux/Cartsytem';
import ImageGallery from './Imagegallary';


const Products = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  async function getData() {
    try {
      let response = await fetch('http://localhost:5001/addproduct');
      let products = await response.json();
      setData(products);
      console.log(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(AddCart(product)); // Dispatch directly without logging
  };

  const handledeletecart = async (id) => {
    try {
      let deleteitem = await fetch(`http://localhost:5001/delete/${id}`, {
        method: 'delete',
      });
      deleteitem = await deleteitem.json();
      console.log(deleteitem);
      getData(); // Refresh product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleupdate = (id) => {
    navigate(`/update/${id}`);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col  items-center bg-[#EBE4DB] ">
      <div className='mt-10'>
      <ImageGallery />
      </div>
      
      <div>
        <img
          className="w-36 h-22 mr-2"
          src="https://cdn.pixabay.com/photo/2023/09/22/15/45/panda-8269336_1280.png"
          alt="logo"
        />
      </div>
      <input
        type="text"
        placeholder="Search products..."
        className="mb-5 px-40 py-1 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {filteredData.map((item, index) => (
          <div key={index} className="border border-black p-5 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg mb-2">{item.name}</h2>
            <p className="text-gray-700">Price: {item.price}</p>
            <p className="text-gray-700">Category: {item.category}</p>
            <p className="text-gray-700">Company: {item.company}</p>
            <div className='flex mb-2 mt-2'>
<button className='bg-[#C3AA80] hover:bg-[#ebe9] text-white font-semibold w-20 mr-5 rounded' >+</button>
              <h1>    Quantity:-{item.quantity}</h1>
              <button className='bg-[#C3AA80] hover:bg-[#ebe9 ] text-white font-semibold w-20 ml-5 rounded' >-</button>
             
  </div>
            <button
              className="mt-3 bg-[#C3AA80] hover:bg-[#977337] text-white px-4 py-2 rounded"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
            <button
              className="mt-3 ml-3 bg-[#C3AA80] hover:bg-[#977337] text-white px-4 py-2 rounded"
              onClick={() => handledeletecart(item._id)}
            >
              Delete
            </button>
            <button
              className="mt-3 ml-3 bg-[#C3AA80] hover:bg-[#977337] text-white px-4 py-2 rounded"
              onClick={() => handleupdate(item._id)}
            >
              Update
            </button>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default Products;
