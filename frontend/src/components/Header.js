import React from "react";
import { Navbar, Nav, Row, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout }from '../actions/userActions'

function Header() {
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  const userLogin = useSelector(state => state.userLogin )
  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header >
      <Navbar className="py-1" bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand>WAO</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <LinkContainer to='/cart/'>
                
                <Nav.Link>
                  <span className="badge bg-danger rounded-pill">
                    {cartItems.reduce((acc, item) => parseInt(acc) + parseInt(item.qty), 0)}
                  </span>
                  <i className="fa-solid fa-cart-shopping justify-content-between">
                  </i>                 
                  cart
                  </Nav.Link>
              </LinkContainer>
              
              
              <LinkContainer to='/login/'>             
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>Cerrar Sesion</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link><i className="fas fa-user"></i>Inicia Sesion</Nav.Link>
              )}
              {/* {userInfo ? 
              <Nav.Link><i className="fas fa-user"></i>{userInfo.username}</Nav.Link>
                : 
                <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
               } */}
              
              </LinkContainer>

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='admin-menu'>
                  <LinkContainer to='/admin/users/'>
                    <NavDropdown.Item>Usuarios</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/products/'>
                    <NavDropdown.Item>Productos</NavDropdown.Item>
                  </LinkContainer> 

                  <LinkContainer to='/admin/orders/'>
                    <NavDropdown.Item>Ordenes</NavDropdown.Item>
                  </LinkContainer>                     
                </NavDropdown>
              )}
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
