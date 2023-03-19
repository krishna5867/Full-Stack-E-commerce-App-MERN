import React from 'react'
import Product from '../Admin/ProductList'
import { Container } from 'reactstrap';

const Products = () => {
    return (
        <div>
        <Container fluid>
            <Product />
        </Container>
        </div>
    )
}

export default Products;