import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import { Row, Button } from 'reactstrap';
import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [product, setProduct] = useState("");

  const getOneProduct = async () => {
    const res = await axios.get(`/getproduct/${id}`);
    if(res.status === 200){
      setProduct(res.data.product)
    }
  }
  const handleAddToCart = (product) => {
    toast.success("Added Successfully")
    dispatch(addToCart({ 
        name: product.name,
        price: product.price, 
        image: product.image?.url }));
};

  useEffect(()=> {
    getOneProduct()
  })

  const styles = {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
    height: '50vh',
    alignItems: 'center'

  }

  return (
    <div>
      <h1 className='mt-2'><u>Product Details</u></h1>
    <Row className='mt-5'>
      <ToastContainer />
      <div className='col-lg-4'>
      <img src={product.image?.url} alt="" style={{width:'25rem'}} className="rounded"/>
      </div>
      <div className="col-lg-8" style={styles}>
        <div className='card p-5 border border-warning border-2'>
      <h3><b>Product Name</b> - {product.name}</h3>
      <h3><b>Product Description</b> - {product.description}</h3>
      <h3><b>Categories</b> - {product.categories}</h3>
      <h3><b>Price</b> - ${product.price}</h3>
      <div className='flex'>
      <Button className='bg-primary m-3 px-3' onClick={()=> handleAddToCart(product)}><b>Add cart</b></Button>
      <Button className='bg-dark m-3 p-2'><b> <Link to='/' className='text-decoration-none text-white px-3'>Back</Link></b></Button>
      </div>
        </div>
      </div>
    </Row>
    </div>
  );
};

export default SingleProduct;
