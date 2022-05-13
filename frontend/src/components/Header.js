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
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand >Home</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <span>{cartItems.reduce((acc, item) => parseInt(acc) + parseInt(item.qty), 0)}</span>
              
              <LinkContainer to='/cart/'>
              <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer>
              
              <LinkContainer to='/login/'>
              
              {userInfo ? (
                <NavDropdown title={userInfo.username} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
              )}
              {/* {userInfo ? 
              <Nav.Link><i className="fas fa-user"></i>{userInfo.username}</Nav.Link>
                : 
                <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
               } */}
              
              </LinkContainer>
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
