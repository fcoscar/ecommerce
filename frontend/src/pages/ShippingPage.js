import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form, FormGroup,  Col, Row  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAdress } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingPage() {
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart  
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)  
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)  
  const [aprt, setAprt] = useState(shippingAddress.aprt)    
  const dispatch = useDispatch()  
  const navigate = useNavigate();

  const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAdress({address, city, postalCode, aprt}))
        navigate('/payment')
  }

  return (
    <><CheckoutSteps step1 step2 /><FormContainer>
          <h1>Direccion de Envio</h1>
          <Form onSubmit={submitHandler}>
              <FormGroup controlId='address'>
                  <Form.Label>Direccion</Form.Label>
                  <Form.Control
                      placeholder='Ingresa tu direccion'
                      value={address ? address : ''}
                      onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
              </FormGroup>

              <FormGroup controlId='aprt'>
                  <Form.Label>Nro. de piso/Apartamento/Casa</Form.Label>
                  <Form.Control
                      placeholder='Ingresa tu direccion'
                      value={aprt ? aprt : ''}
                      onChange={(e) => setAprt(e.target.value)}
                  ></Form.Control>
              </FormGroup>

              <FormGroup controlId='city'>
                  <Form.Label>Sector</Form.Label>
                  <Form.Control
                      placeholder='Ingresa tu sector'
                      value={city ? city : ''}
                      onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
              </FormGroup>

              <FormGroup controlId='postalCode'>
                  <Form.Label>Codigo Postal</Form.Label>
                  <Form.Control
                      placeholder='Codigo Postal'
                      value={postalCode ? postalCode : ''}
                      onChange={(e) => setPostalCode(e.target.value)}
                  ></Form.Control>
              </FormGroup>
              <div className='text-center py-3'>
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

export default ShippingPage