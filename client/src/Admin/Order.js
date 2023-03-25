import React, { useState, useEffect } from 'react';
import { Row, Container, Button, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'

const Orders = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("/admin/orders");
    if (res.status === 200) {
      setOrderDetails(res.data.order)
    }
  }
  useEffect(() => {
    fetchOrders()
  }, [])
  return (
    <>
      <Row className='p-4'>
        <Container fluid className='col-lg-3 mb-5'>
          <Container className='mt-4 mb-5'>
          </Container>
          <Button className='w-100 mt-5 bg-'><h3><Link to="/admindashboard/orders" className='text-decoration-none text-white'>Order</Link></h3></Button>
          <Button className='w-100 mt-3'><h3><Link to="/admindashboard/allusers" className='text-decoration-none text-white'>All Users</Link></h3></Button>
          <Button className='w-100 mt-3'><h3><Link to="/admindashboard/allproducts" className='text-decoration-none text-white'>All Products</Link></h3></Button>
          <Button className='w-100 mt-3'><h3><Link to="/admindashboard/addproducts" className='text-decoration-none text-white'>Add Products</Link></h3></Button>
          <Button className='w-100 mt-3'><h3><Link to="/createcategories" className='text-decoration-none text-white'>Create Category</Link></h3></Button>
        </Container>
        <Container className='col-lg-9' style={{ height: '88vh' }}>
          <h1>Orders</h1>
          <Container className='mt-3'>
            <Card style={{ height: '32rem' }}>
              <div className='mt-2' style={{ height: '300px' }}>
                {/* Content */}
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Sno</th>
                      <th scope="col">OrderId</th>
                      <th scope="col">Buyer Name</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  {orderDetails && orderDetails.map((item, index) =>
                    <tbody>
                      <tr key={item._id}>
                      <td>{index + 1}</td>
                        <td><Link to={`/orderdetails/${item._id}`} className="text-decoration-none">{item._id}</Link></td>
                        <td><Link to={`/buyerDetails/${item?.user._id}`} className="text-decoration-none text-black">{item.user.name}</Link></td>
                        <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
                        <td> Process </td>
                    </tr>
                    </tbody>
                  )}
              </table>
            </div>
          </Card>
        </Container>
      </Container>
    </Row>

    </>
  )
}

export default Orders;