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
    USER_DETAILS_RESET
} from '../constants/userConstants'

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
    dispatch({type:USER_LOGOUT})
    //Limpiar userDetails cuando hacemos log out y no se quede la info del usuario anterior(userDetailsReducer)
    dispatch({type:USER_DETAILS_RESET})

}

export const userRegister = (first_name, last_name, username, email, password ) => async (dispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const response = await fetch('/users/profile/create/', {
            method: 'POST',
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                username: username,
                email: email,
                password: password
            }),
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
