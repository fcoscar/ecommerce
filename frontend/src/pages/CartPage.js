import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartAction'

function CartPage() {
  const navigate = useNavigate()
  const {productId} = useParams()
  const [searchParams] = useSearchParams()
  const qty = searchParams.get("qty")
  const dispatch = useDispatch()
  
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch, productId, qty])

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId))
      
  }

  const checkOutHandler = () => {
    navigate('/login?redirect=shipping')
  }


  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ?(
          <h2>Empty Cart</h2>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col>Qty</Col>
                                <Col xs='auto' className='my-1'>
                                    <Form.Control 
                                        as='select'
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCart(item.product, parseInt(e.target.value)))} //cambiar cantidad en el carrito
                                    >
                                        { //crear un array a partir de countInStock [0,1,2,...]
                                            [...Array(item.countInStock).keys()].map(
                                                (x) => (
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                )
                                            )
                                        }

                                    </Form.Control>
                                </Col>
                                <Col md={1}>
                                  <Button 
                                  type='button'
                                  variant='light'
                                  onClick={()=> removeFromCartHandler(item.product)}>
                                    <i className='fas fa-trash'></i>
                                  </Button>
                                </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )
          
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => parseInt(acc) + parseInt(item.qty), 0)}) items</h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item className='text-center'>
            <Button
              type='button'
              className='btn-block'      
              disabled={cartItems.length === 0}
              onClick={checkOutHandler}      
            >Proceed to Checkout</Button>
          </ListGroup.Item>
        </Card>
      </Col>

    </Row>
  )
}

export default CartPage