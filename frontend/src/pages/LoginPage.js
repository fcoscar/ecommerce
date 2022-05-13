import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate }from 'react-router-dom'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector }from 'react-redux'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const redirect = searchParams.get('redirect') === null ? '/' : searchParams.get('redirect')
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    },[ navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
    <FormContainer>
        <h1> Sing In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control 
                placeholder='Enter Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            
            <Button
            type='submit'
            variant='primary'>
                Sing in
            </Button>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link 
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>

        </Form>
    </FormContainer>
  )
}


export default LoginPage