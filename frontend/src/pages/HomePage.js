import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction'

function HomePage() {
  const dispatch = useDispatch()
  const productsList = useSelector(state => state.productsList)
  const { error, loading, products } = productsList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <div>
      <h1>Latest products</h1>
      {loading ? <Loader />
        : error ? <h3>{error}</h3>
          :
          <Row>
            {products.map(product =>
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            )}
          </Row>
      }

        </div >
      )
}

export default HomePage