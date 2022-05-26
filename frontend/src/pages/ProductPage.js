import React, { useEffect, useState } from 'react'
import {useParams, useNavigate}from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productAction'


function ProductPage() {
    const [qty, setQty] = useState(1)
    const {productId} = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productsDetails)
    const { error, loading, product } = productDetails
    const navigate = useNavigate()

  useEffect(() => {
      dispatch(listProductDetails(productId))
  },[dispatch, productId])

  const addToCartHandler = () => {
      navigate(`/cart/${productId}?qty=${qty}`)
  }

  return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        {loading ? <Loader/>
            : error ? <h3>{error}</h3>
            :
            <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'f8e825'}/>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                            <ListGroupItem>
                                <Col>Qty</Col>
                                <Col xs='auto' className='my-1'>
                                    <Form.Control 
                                        as='select'
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                    >
                                        { //crear un array a partir de countInStock [0,1,2,...]
                                            [...Array(product.countInStock).keys()].map(
                                                (x) => (
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                )
                                            )
                                        }

                                    </Form.Control>
                                </Col>
                            </ListGroupItem>
                        )}

                        <ListGroup.Item className='text-center'> 
                            <Button 
                            className='btn btn-block' 
                            disabled={product.countInStock===0 || product.countInStock < 0} 
                            type='button'
                            onClick={addToCartHandler}
                            >Add to Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        }
        


    </div>
  )
}

export default ProductPage