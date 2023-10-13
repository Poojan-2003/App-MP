import React from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Mycomp.css'
import { Link } from "react-router-dom";

function MyComp() {
    console.log();
    const navigate = useNavigate();
    const name = localStorage.getItem("name")
    const location = useLocation();
  return (
    <div>

        <div className="flex justify-between items-center bg-primary p-5">
          <Link to = '/home' className="text-2xl text-white">APP MP</Link>

          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
            <i className="ri-shield-user-line"></i>
            <span
              className="underline cursor-pointer uppercase"
              onClick={() => navigate("/profile")}
            >
              {name}
            </span>
            <i
              className="ri-logout-box-r-line ml-10"
              onClick={() => {
                localStorage.removeItem("name");
                navigate("/login");
              }}
            ></i>

            {/* <i className="ri-logout-b" */}
          </div>
        </div>
     
      {/* <div></div> */}
     <div className='flex'>
              <div className='mt-10 ml-20 '><img className="img2"src={location.state.img} alt='img' /></div>
              <div className='div2'>
                <div id="div2" className='mt-10 mb-12'><b>Product Name :</b> {location.state.name}</div>
                <div id="div2" className='mb-10'><b>Product Category:</b> {location.state.category}</div>
                <div id="div2" className='mb-10 leading-9'><b>Product Description :</b> Introducing the LG's Refrigerator, a versatile and essential household appliance designed to meet your food storage needs. This refrigerator, available in a range of color options to suit your kitchen's aesthetics, boasts an efficient design with carefully considered dimensions. Standing at 50 inches tall, 25 inches wide, and 40 inches deep, it offers ample interior space with a total capacity of 2 cubic feet. This includes 20 cubic feet for fresh food storage and 20 cubic feet for frozen items.
                <p className='mt-5 leading-9'>Not only is this refrigerator spacious, but it's also energy-efficient, proudly carrying the Energy Star certification. With an annual energy consumption of 10 kWh per year, it helps you save on utility bills while being environmentally responsible. The cooling system features a dual compressor and Good defrost mechanism, with precise temperature control to keep your food fresh.</p></div>
                <div><b>Price : </b> {location.state.price}</div>
                <div><button className='btn9'>Buy Now</button></div>
              </div>
     </div>
    </div>
  )
}

export default MyComp
