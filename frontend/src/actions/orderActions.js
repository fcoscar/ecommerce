import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL
} from '../constants/OrderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const creteOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: {userInfo} } = getState()
        const token = 'Bearer ' + userInfo.token
        
        const response = await fetch('/orders/add/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(order)

        })

        const data = await response.json()

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type:CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')

    }catch(error){
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}

export const listOrderDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })

        const { userLogin: {userInfo} } = getState()
        const token = 'Bearer ' + userInfo.token

        const response = await fetch(`/orders/${id}/`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        })

        const data = await response.json()

        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}