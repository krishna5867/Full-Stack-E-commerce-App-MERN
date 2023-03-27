import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Button } from 'reactstrap';
import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from './Loading';
import { useParams, Link } from "react-router-dom";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [relatedProduct, setRelatedProduct] = useState("");
  const [loading, setLoading] = useState(true)
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState(['Krisna-very good, produc', 'paisa wasool', 'Quality is top notch'])
console.log(comment);
  const fetchRelatedProducts = async () => {
    const res = await axios.get(`/relatedProducts/${id}`);
    if (res.status === 200) {
      setRelatedProduct(res.data.relatedProducts);
    }
  }
  const getOneProduct = async () => {
    const res = await axios.get(`/getproduct/${id}`);
    if (res.status === 200) {
      setProduct(res.data.product)
      setLoading(false)

    }
  }
  const handleAddToCart = (product) => {
    toast.success("Added Successfully")
    dispatch(addToCart({
      name: product.name,
      price: product.price,
      image: product.image?.url
    }));
  };

  const handlePostComment = async (productId) => {
    const res = await axios.put("/comment", comment);
    if(res.status === 200){
      setcomment(res.data.product)
    }
  }


  useEffect(() => {
    setLoading(true)
    getOneProduct()
    fetchRelatedProducts()
  }, [id])

  const styles = {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
    height: '50vh',
    alignItems: 'center'
  }

  return (
    <>
      {
        loading ? (<Spinner />) : (
          <>
            <h2 className='mt-2'><u>Product Details</u></h2>
            <Row className='mt-5'>
              <ToastContainer />
              <div className='col-lg-4'>
                <img src={product.image?.url} alt="" style={{ width: '25rem' }} className="rounded" />
              </div>
              <div className="col-lg-8" style={styles}>
                <div className='card p-5 border border-warning border-2'>
                  <h3><b>Product Name</b> - {product.name}</h3>
                  <h3><b>Description</b> - {product.description}</h3>
                  {/* <h3><b>Category</b> - {product.categories}</h3> */}
                  <h3><b>Price</b> - ${product.price}</h3>
                  <div className='flex'>
                    <Button className='bg-primary m-3 px-3' onClick={() => handleAddToCart(product)}><b>Add cart</b></Button>
                    <Button className='bg-dark m-3 p-2'><b> <Link to='/' className='text-decoration-none text-white px-3'>Back</Link></b></Button>
                  </div>
                  {/* Comments */}
                  <input type="text" placeholder='Comment' className='input-box' value={comment} onChange={(e)=>setcomment(e.target.value)} />
                  <button className='btn btn-success mt-2' onClick={()=> handlePostComment(product._id)}>Post</button>
                  {
                    comments && comments.map((item) => 
                      <div key={item.id}>
                      {item}
                      </div>
                    )
                  }
                </div>
              </div>
            </Row>
          </>
        )}




      {relatedProduct.length > 0 ?
        <>
          <h2 className='mt-2'><u>Related Products</u></h2>
          <Row className='mt-5'>
            <ToastContainer />
            <div className='mt-2 d-flex justify-content-center flex-wrap '>
              {relatedProduct && relatedProduct.map((product) =>
                <>
                  <ToastContainer autoClose={2000} />
                  <div className='d-flex'>
                    <div className="shadow-lg m-4 mb-5 bg-white rounded card-img-top" key={product._id}>
                      <Link to={`/product/${product._id}`} className='text-decoration-none text-white'>
                        <img src={product.image?.url} className="w-full" alt="..." style={{ height: '18rem', width: '15rem' }} />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title">{product.name.toUpperCase()}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text"><h3>${product.price}</h3></p>
                        <button className='btn btn-primary mb-3' onClick={() => handleAddToCart(product)}><b>Add To Cart</b></button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Row>
        </> : ""}
    </>
  );
};

export default SingleProduct;
