import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";




const Register = () => {

    const navigate = useNavigate();



  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer:"",
  });




  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev)=>({
        ...prev, 
        [name]:value,
    }))
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    console.log(userData);


    try{
        const res = await axios.post(`/api/v1/auth/register`, userData);

        if(res && res.data.success){
            toast.success(res.data.message);
            navigate('/login')
        }
        else{
            toast.error(res.data.message);
        }


    }
    catch(err){
        console.log(err);   
    }

  }


  return (
    <Layout title="Register-Ecommerce App">
      <div className="container d-flex justify-content-center p-4">
        <div className="card" style={{ width: "500px" }}>
          <div className="card-body">
            <h3 className="card-title">Registration Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={handleChange}
                  className="form-control"
                  id="name"
                  name="name"
                  
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={handleChange}
                  className="form-control"
                  id="phone"
                  name="phone"
                />
              </div>





              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  rows="3"
                  value={userData.address}
                  onChange={handleChange}
                  name="address"
                ></textarea>
              </div>


              {/* answer */}


              <div className="mb-3">
                <label htmlFor="answer" className="form-label">
                  Answer
                </label>
                <input
                  type="text"
                  value={userData.answer}
                  onChange={handleChange}
                  className="form-control"
                  id="answer"
                  name="answer"
                  placeholder="What is your favourite food ?"
                  
                />
              </div>







              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
