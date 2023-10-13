import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GetProducts } from "../../apicalls/products1";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { TextField } from "@mui/material";
import MyComp from "./MyComp";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = React.useState([]);
  const [Query, setQuery] = useState("");
  const [filters, setFilters] = React.useState({
    status: "approved",
  });

  const Data = [
    {
      name: "Fridge",
      price: "$500",
      category: "Electronics",
      img: "https://thumbs.dreamstime.com/z/silver-fridge-8049386.jpg?w=576",
    },
    {
      name: "juice",
      price: "$500",
      category: "Electronics",
      img: "https://thumbs.dreamstime.com/z/silver-fridge-8049386.jpg?w=576",
    },
    {
      name: "juice",
      price: "$500",
      category: "Electronics",
      img: "https://thumbs.dreamstime.com/z/silver-fridge-8049386.jpg?w=576",
    },
    {
      name: "juice",
      price: "$500",
      category: "Electronics",
      img: "https://thumbs.dreamstime.com/z/silver-fridge-8049386.jpg?w=576",
    },
    {
      name: "juice",
      price: "$500",
      category: "Electronics",
      img: "https://thumbs.dreamstime.com/z/silver-fridge-8049386.jpg?w=576",
    },
    {
      name: "juice",
      price: "$500",
      category: "Electronics",
      img: "https://thumbs.dreamstime.com/z/silver-fridge-8049386.jpg?w=576",
    },
    {
      name: "juice",
      price: "$500",
      category: "Electronics",
      img: "https://thumbs.dreamstime.com/z/silver-fridge-8049386.jpg?w=576",
    },
    {
      name: "juice",
      price: "$500",
      category: "Electronics",
      img: "https://thumbs.dreamstime.com/z/silver-fridge-8049386.jpg?w=576",
    },
    {
      name: "juice",
      price: "$500",
      category: "Electronics",
      img: "https://thumbs.dreamstime.com/z/silver-fridge-8049386.jpg?w=576",
    },
    
    
  ];
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  // const { user }  = useSelector((state) => state.users);
  // const Data
  const getpage = async (name, category, price, img) => {
    // <MyComp
    //   name={name}
    //   category={category}
    //   price={price}
    //   img={img}
    //   />
    // navigate(`/Mycomp`,{
    //   replace: true,
    //   state:{
    //   name:name,

    //   }
    // })
    navigate("/Mycomp", {
      state: { name: name, img: img, category: category, price: price },
    });
  };
  const getData = async () => {
    try {
      const response = await GetProducts(filters);
      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* header */}
      <div className="flex justify-between items-center bg-primary p-5">
        <Link to='/home' className="text-2xl text-white">APP MP</Link>

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

      {/* <div className="grid grid-cols-4 gap-5"> */}
      <div className="top">
        <input
          type="text"
          placeholder="Search Products"
          className="txt"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap ml-5 mt-5">
        {Data?.filter((Data) => Data.name.toLowerCase().includes(Query)).map(
          (data, i) => (
            <div className="outdiv" key={i}>
              <img src={data.img} alt="img" className="img"></img>
              <div className="mt-5 mb-5"><b>Name : </b>{data.name}</div>
              <div className="mb-5"><b>Category : </b>{data.category}</div>
              <hr className="mb-5 mr-5" />
              <div className="mt-7 text-primary">
                <b>Price :  {data.price}</b>
              </div>
              <div className="btn4">
                <button
                  className="btn5"  
                  onClick={() =>
                    getpage(data.name, data.category, data.price, data.img)
                  }
                >
                 View Product
                </button>
              </div>
            </div>
          )
        )}
      </div>
      
    </div>
  );
}

export default Home;
