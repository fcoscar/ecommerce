import React, { useEffect } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import {getUsers} from '../actions/userActions'

function UsersListPage() {
  const dispatch = useDispatch()
  const usersList = useSelector(state => state.usersList)
  const {error, loading, users} = usersList
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
    
  return (
    <div>
        {users.map(user => 
        <h1 key={user.id}>{user.username}</h1>)}
    </div>
  )
}

export default UsersListPage
