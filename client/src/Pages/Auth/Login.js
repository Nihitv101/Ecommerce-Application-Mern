import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import toast from 'react-hot-toast'

import { useAuth } from '../../context/auth';

const Login = () => {

  const location = useLocation();


  const [auth, setAuth] = useAuth();



    const navigate = useNavigate();

    const [userData, setUserData] = useState({

        email: "",
        password: "",
      });
    
    
    

    const handleSubmit = async(e)=>{


        e.preventDefault();

        try{
            const res = await axios.post(`/api/v1/auth/login`, userData);
    
            if(res && res.data.success){
                toast.success(res.data.message);
                setAuth({
                  ...auth,
                  user:res.data.user,
                  token:res.data.token,
                })
                
                localStorage.setItem('auth', JSON.stringify(res.data));

                
                navigate(location.state ||  '/')

            }
            else{
                toast.error(res.data.message);
            }
    
    
        }
        catch(err){
            console.log(err);   
        }

    }

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setUserData((prev)=>({
            ...prev, 
            [name]:value,
        }))

    }



  return (
    <Layout>
        <div className="container d-flex justify-content-center p-4">
        <div className="card" style={{ width: "500px" }}>
          <div className="card-body">
            <h3 className="card-title">Login Form</h3>
            <form onSubmit={handleSubmit}>

     


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

              <div className="d-flex flex-column gap-4">

                <button type="submit" className="btn btn-primary w-50 mx-auto" onClick={()=>navigate('/forgot-password')} >
                  Forgot Password
                </button>

              <button type="submit" className="btn btn-primary w-50 mx-auto">
                Login
              </button>
              </div>






            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login;
