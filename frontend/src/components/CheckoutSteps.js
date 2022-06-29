import React from 'react'

import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({step1, step2 ,step3, step4}) {
    const currPage = window.location.pathname
    const redirect = `/login?redirect=${currPage.slice(1)}`
    
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {step1 ? (
                <LinkContainer to={redirect}>
                    <Nav.Link>Iniciar Sesion</Nav.Link>
                </LinkContainer>                
            ): (
                <Nav.Link disabled>Iniciar Sesion</Nav.Link>
            )}

        </Nav.Item>

        <Nav.Item>
            {step2 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link>Direccion de Envio</Nav.Link>
                </LinkContainer>                
            ): (
                <Nav.Link disabled>Direccion de Envio</Nav.Link>
            )}

        </Nav.Item>

        <Nav.Item>
            {step3 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link>Realizar Pago</Nav.Link>
                </LinkContainer>                
            ): (
                <Nav.Link disabled>Realizar Pago</Nav.Link>
            )}

        </Nav.Item>

        <Nav.Item>
            {step4 ? (
                <LinkContainer to='/placeorder'>
                    <Nav.Link>Confirmar Orden</Nav.Link>
                </LinkContainer>                
            ): (
                <Nav.Link disabled>Confirmar Orden</Nav.Link>
            )}

        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps