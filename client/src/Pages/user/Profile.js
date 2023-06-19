import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast'

import axios from 'axios';

const Profile = () => {
  const [auth, setAuth] = useAuth();



  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",

  });



  // get user info:

  useEffect(()=>{
    const {email, name, phone, address} = auth?.user;
    setUserData({...userData,name, email, phone, address})
    
  }, [])


  
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
        const {data} = await axios.put(`/api/v1/auth/profile`, userData);

        if(data?.error){
          toast.error(data?.error);
        }
        else{
          setAuth({...auth, user:data?.updatedUser});
          let ls = localStorage.getItem('auth');

          ls = JSON.parse(ls);
          ls.user = data.updatedUser
          localStorage.setItem('auth', JSON.stringify(ls));
          toast.success("Profile Updated Successfully")
        }

    }
    catch(err){
        console.log(err);   
    }

  }



  return (
    <Layout>
            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                    <UserMenu />
                    </div>
                    <div className="col-md-9">
                    <div className="container d-flex justify-content-center p-4">
        <div className="card" style={{ width: "500px" }}>
          <div className="card-body">
            <h3 className="card-title">User Profile</h3>
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
                  disabled
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


              <button type="submit" className="btn btn-primary">
                Update
              </button>


            </form>
          </div>
        </div>
      </div>
                    </div>
                </div>
            </div>
    </Layout>
  )
}

export default Profile