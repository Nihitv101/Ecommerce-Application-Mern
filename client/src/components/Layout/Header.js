import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/auth";

import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";

import useCategory from "../../hooks/useCategory";

import { useCart } from "../../context/cart";

import { Badge } from "antd";



const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();


  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");

    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            ApniDukaan
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />

              <li className="nav-item">
                <Link
                  to={"/"}
                  className="nav-link "
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  to="/categories"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>

                <ul className="dropdown-menu">

                <li>
                <Link to="/categories" class="dropdown-item">
                        All Categories
                      </Link>
                </li>
                  {categories?.map((c) => (
                    <li>
                
                      <Link to={`/category/${c.slug}`} class="dropdown-item">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link"
                  aria-current="page"
                  href="#"
                >
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link"
                  aria-current="page"
                  href="#"
                >
                  Contact
                </Link>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <Link
                      to={"/register"}
                      className="nav-link"
                      aria-current="page"
                      href="#"
                    >
                      Register
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to={"/login"}
                      className="nav-link"
                      aria-current="page"
                      href="#"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          to={"/login"}
                          onClick={handleLogout}
                          aria-current="page"
               
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item"></li>
                </>
              )}

              <li className="nav-item">

              <Badge count={cart?.length} showZero>
                         
                <Link className="nav-link" aria-current="page" to='/cart' >
                  Cart
                </Link>
              </Badge>

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
