import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import Layout from '../components/Layout/Layout';


const ProductDetails = () => {

    const params = useParams();
    const [product ,setProduct] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);



    useEffect(() => {
        if (params?.slug) getProduct();
      }, [params?.slug]);
      //getProduct
    


  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };



  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
    
  return (

    <Layout>
        <div className="row container p-4 mt-2">
            <div className="col-md-6">
            <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product?.name}
                    height={300}
                    
                  />
            </div>
            <div className="col-md-6">
            <h1 className='text-center'>Product Details</h1>
                <h6>Product Name : {product.name}</h6>
                <h6>Product Description : {product.description}</h6>
                <h6>Product Price : {product.price}</h6>
                <h6>Product Category : {product?.category?.name}</h6>
                <button className='btn btn-warning'>Add To Cart</button>
            </div>
       
        </div>
        <hr />
        <div className="row container">
        <div className="d-flex flex-wrap">
        <h6>Similar Products</h6>

        {relatedProducts.length < 1 && <p className='mt-5 text-center'>No Similar Products Found</p> }

     
            {


                relatedProducts?.map((p) => (
              <>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">$ {p.price}</p>
                    <button className="btn btn-primary" >Add</button>
                  </div>
                </div>
              </>
            ))

        
            }
          </div>
        </div>

    </Layout>
 
  )
}

export default ProductDetails;
