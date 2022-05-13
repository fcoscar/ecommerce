import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { userRegister } from '../actions/userActions'
import { Button, Form, FormGroup,  Col, Row  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFname] = useState('')
    const [last_name, setLname] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //revisar si ha iniciado sesion para enviarlo al home de ser asi
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin
    useEffect(() => {
        if(userInfo){
            navigate('/')
        }
    },[ navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userRegister(first_name, last_name, username, email, password))
        navigate('/')
    }

  return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <FormGroup controlId='first_name'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                placeholder='Enter First Name'
                value={first_name}
                onChange={(e) => setFname(e.target.value)}
                ></Form.Control>
            </FormGroup>

            <FormGroup controlId='last_name'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                placeholder='Enter Last Name'
                value={last_name}
                onChange={(e) => setLname(e.target.value)}
                ></Form.Control>
            </FormGroup>

            <FormGroup controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
            </FormGroup>

            <FormGroup controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </FormGroup>

            <FormGroup controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </FormGroup>

            <Button
            type='submit'
            variant='primary'>
                Sign Up
            </Button>
        </Form>    
            <Row className='py-3'>
                <Col>
                    Already have an account? <Link 
                    to='/login'>Log In</Link>
                </Col>
            </Row>

    </FormContainer>
  )
}

export default RegisterPage