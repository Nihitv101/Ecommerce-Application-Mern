import React, {useState} from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast'




import axios from 'axios';


const ForgotPassword = () => {  
  

      const navigate = useNavigate();


      const [userData, setUserData] = useState({

        email: "",
        newPassword: "",
        answer:"",
      });
    
    
    

    const handleSubmit = async(e)=>{


        e.preventDefault();

        try{
            const res = await axios.post(`/api/v1/auth/forgot-password`, userData);
    
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
            <h3 className="card-title">RESET PASSWORD Form</h3>
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
                  New Password
                </label>
                <input
                  type="password"
                  value={userData.newPassword}
                  onChange={handleChange}
                  className="form-control"
                  id="password"
                  name="newPassword"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Answer
                </label>
                <input
                  type="password"
                  value={userData.answer}
                  onChange={handleChange}
                  className="form-control"
                  id="answer"
                  name="answer"
                  placeholder="Enter your favourtie food"
                />
              </div>



              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-primary w-50">
                  RESET
                </button>
              </div>



            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
