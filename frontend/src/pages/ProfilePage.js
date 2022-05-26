import React, { useState, useEffect } from 'react'
import { Button, Form, FormGroup,  Col, Row, Table  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getUserDetails, getUserOrders, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import Moment from 'moment'
import LinkContainer from 'react-router-bootstrap/LinkContainer'

function ProfilePage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFname] = useState('')
    const [last_name, setLname] = useState('') 
    const [email, setEmail] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userOrdersDetails = useSelector(state => state.userOrdersDetails)
    const {orders} = userOrdersDetails
    
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(getUserOrders())
            }else{
                setEmail(user.email)
                setUsername(user.username)
                setFname(user.first_name)
                setLname(user.last_name)
            }
        }
    },[dispatch, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserProfile({
            'id':user.id,
            'first_name': first_name,
            'email': email,
            'last_name': last_name,
            'password': password,
            'username': username
        }))
    }
    return (
        <Row>
            <Col md={3}>
                <h2>Perfil</h2>
        <Form onSubmit={submitHandler}>
            <FormGroup controlId='first_name'>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                placeholder='Enter First Name'
                value={first_name}
                onChange={(e) => setFname(e.target.value)}
                ></Form.Control>
            </FormGroup>

            <FormGroup controlId='last_name'>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                placeholder='Enter Last Name'
                value={last_name}
                onChange={(e) => setLname(e.target.value)}
                ></Form.Control>
            </FormGroup>

            <FormGroup controlId='username'>
                <Form.Label>Usuario</Form.Label>
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
                disabled
                ></Form.Control>
            </FormGroup>

            <FormGroup controlId='password'>
                <Form.Label>Contrasena</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </FormGroup>

            <div className='text-center py-3'>
                <Button
                type='submit'
                variant='primary'
                >
                    Actualizar Perfil
                </Button>
            </div>

        </Form>  
            </Col>
            <Col md={9}>
                <h2>Mis Ordenes</h2>
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>FECHA</th>
                                <th>TOTAL</th>
                                <th>PAGADO</th>
                                <th>ENTREGADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => 
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{Moment(order.createdAt).format('DD-MM-YYYY hh:mm')    }</td>
                                    <td>${order.totalPrice}</td>
                                    <td><i className='fa-solid fa-check'></i></td>
                                    <td><LinkContainer to={`/order/${order._id}`} ><Button classNam='btn-sm'>Detalles</Button></LinkContainer></td>
                                </tr>
                            )}
                        </tbody>

                    </Table>

            </Col>
        </Row>
    )
}

export default ProfilePage