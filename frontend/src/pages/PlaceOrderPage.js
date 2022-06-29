import React, { useEffect, useState } from 'react'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { creteOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/OrderConstants'


function PlaceOrderPage() {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success} = orderCreate

    const cart = useSelector(state => state.cart)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    cart.itemPrice = cart.cartItems.reduce((acc, item) => acc + parseFloat(item.price).toFixed(2) * parseFloat(item.qty).toFixed(2), 0).toFixed(2)
    cart.shippingPrice = 100
    cart.taxPrice = Number((0.18) * cart.itemPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemPrice)  + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


    useEffect(() => {
        if (success){
            navigate(`/order/${order._id}`)
            dispatch({type:ORDER_CREATE_RESET})
        }
    }, [success, navigate])

    const placeOrder = () => {
        dispatch(creteOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemPrice:cart.itemPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
            taxPrice: cart.taxPrice
        }))
    }


  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Envio:</h2>
                        <p>  
                            {cart.shippingAddress.city}, {cart.shippingAddress.address}, 
                            {' '}
                            {cart.shippingAddress.aprt}, {cart.shippingAddress.postalCode}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Metodo de Pago:</h2>
                        <p>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Productos:</h2>
                        {cart.cartItems.lenght === 0 ? 'El carrito esta vacio' :
                        (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item) =>(
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} fluid rounded></Image>
                                            </Col>
                                            <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col> 
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}

                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>                 
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Resumen de Orden </h2>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col>Producto:</Col>
                                <Col>${cart.itemPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col>Envio:</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Impuestos:</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item  className='text-center py-3'>
                            <Button 
                            type='button' 
                            className='btn btn-block' 
                            disabled={cart.cartItems === 0}
                            onClick={placeOrder}
                            >Enviar Orden</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderPage