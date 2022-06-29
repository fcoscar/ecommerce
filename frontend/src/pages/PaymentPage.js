import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form, FormGroup,  Col, Row  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentPage() {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart  
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        //console.log(paymentMethod)
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return (
        <><CheckoutSteps step1 step2 step3 /><FormContainer>
            <Form onSubmit={submitHandler}>

                <Form.Group>
                    <Form.Label as='legend'>Seleccionar metodo de pago</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Credit/Debit Card'
                            id='card'
                            value='Credit/Debit Card'
                            name='paymentMethod'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                        <Form.Check
                            type='radio'
                            label='Paypal'
                            id='paypal'
                            value='PayPal'
                            name='paymentMethod'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <div  className='text-center py-3'>
                    <Button
                        type='submit'
                        variant='primary'>
                        Confirmar
                    </Button>
                </div>

            </Form>
        </FormContainer></>
    )
}

export default PaymentPage