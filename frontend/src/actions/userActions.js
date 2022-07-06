import { CART_SHIPPING_ADDRESS_RESET } from '../constants/cartConstants'
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_DETAILS_RESET,
    USER_ORDER_DETAILS_REQUEST,
    USER_ORDER_DETAILS_SUCCESS,
    USER_ORDER_DETAILS_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_FAIL, 
    USER_DELETE_SUCCESS,
    USER_LIST_REMOVE
} from '../constants/userConstants'

export const deleteUser = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_DELETE_REQUEST
        })
        const { userLogin: {userInfo}} = getState()
        const token = 'Bearer ' + userInfo.token
        const response = await fetch(`/admin/deleteUser/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }

        })
        const data = await response.json()
        dispatch ({
            type: USER_DELETE_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LIST_REMOVE,
            payload: id
        })

    }catch (error){
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}

export const getUsers = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_LIST_REQUEST
        })
        const { userLogin: {userInfo} } = getState()
        const token = 'Bearer ' + userInfo.token
        const response = await fetch('/users/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }

        })
        const data = await response.json()
        dispatch ({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    }catch (error){
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}

export const login = (username, password) =>  async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        
        const response = await fetch('/users/login/', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
    
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }

}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    //localStorage.removeItem('shippingAddress')
    dispatch({type:USER_LOGOUT})
    //Limpiar userDetails cuando hacemos log out y no se quede la info del usuario anterior(userDetailsReducer)
    dispatch({type:USER_DETAILS_RESET})

}

export const userRegister = (user) => async (dispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const response = await fetch('/users/profile/create/', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
        dispatch(login(user.username, user.password))

    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    
    try{
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin: {userInfo} } = getState()
        const token = 'Bearer ' + userInfo.token
        console.log(token)

        const response = await fetch(`/users/${id}/`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        })
        const data = await response.json()

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: {userInfo} } = getState()
        const token = 'Bearer ' + userInfo.token
        console.log(token)

        const response = await fetch(`/users/profile/update/`, {
            method: 'PUT',
            body: JSON.stringify({
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                password: user.password
            }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        })
        const data = await response.json()

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })


    }catch(error){
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}

export const getUserOrders = () => async (dispatch, getState) => {
    
    try{
        dispatch({
            type: USER_ORDER_DETAILS_REQUEST
        })

        const { userLogin: {userInfo} } = getState()
        const token = 'Bearer ' + userInfo.token

        const response = await fetch(`/user/orders/`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        })
        const data = await response.json()

        dispatch({
            type: USER_ORDER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: USER_ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}