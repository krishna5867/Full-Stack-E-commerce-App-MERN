import React from 'react'
import {Row, Container, Button, Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'

const Orders = () => {
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
        </Container>
        <Container className='col-lg-9' style={{ height: '88vh' }}>
          <h1>Orders</h1>
          <Container className='mt-3'>
            <Card style={{ height: '32rem' }}>
              <div className='mt-2' style={{ height: '300px' }}>
                {/* Content */}
                <Card className='w-50 mx-auto mt-5'>
                  <CardBody>Order Not Available !</CardBody>
                </Card>
              </div>
            </Card>
          </Container>
        </Container>
      </Row>

    </>
  )
}

export default Orders;