import React, { useEffect, useState } from 'react'
import {useParams, useNavigate}from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderDetails } from '../actions/orderActions'
import Message from '../components/Message'
import Moment from 'moment'

function OrderDetailsPage() {
    const {orderId} = useParams()
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { error, loading, order } = orderDetails
    if(!loading && !error){
        order.itemPrice = order.orderItems.reduce((acc, item) => acc + parseFloat(item.price).toFixed(2) * parseFloat(item.qty).toFixed(2), 0).toFixed(2)
    }


    useEffect(() => {
        if(!order || order._id !== Number(orderId)){
            dispatch(listOrderDetails(orderId))
        }
    },[order, dispatch, orderId])
  return (
    <div>
        <h1>Confirmacion de Orden (<small className='text-muted'>ORDEN #{orderId}</small>)</h1>
        {loading ? <Loader/>
        : error ? <h3>{error}</h3>
        : <div>
            <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Envio:</h2>
                        <p><strong>Name: {order.user.name}</strong></p>
                        <p><strong>Email: {order.user.email}</strong></p>
                        <p>  
                            {order.shippingAddress.city}, {order.shippingAddress.address}, 
                            {' '}
                            {order.shippingAddress.aprt}, {order.shippingAddress.postalCode}
                        </p>
                        
                        {order.isDelivered ? (
                            <Message variant='success'>Entregado el {Moment(order.deliveredAt).format('DD-MM-YYYY hh:mm')}</Message>
                            
                           ) : (
                                <Message variant='warning'>En camino</Message>
                            )

                        }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Metodo de Pago:</h2>
                        <p>
                            {order.paymentMethod}
                        </p>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Productos:</h2>
                        {order.orderItems.lenght === 0 ? 'El carrito esta vacio' :
                        (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item) =>(
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
                                <Col>${order.itemPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col>Envio:</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Impuestos:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </div> }
    </div>
  )
}

export default OrderDetailsPage