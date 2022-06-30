import React, { useEffect } from 'react' 
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getUsers } from '../actions/userActions'
import Loader from '../components/Loader'

function UsersListPage() {
  const dispatch = useDispatch()
  const usersList = useSelector(state => state.usersList)
  const {error, loading, users} = usersList
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const deleteHandler = (id) => {

  }

    
  return (
    <div>
        {loading ? <Loader/>
          : error ? <h3>{error}</h3>
            : 
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user =>
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.first_name} {user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? <i className='fas fa-check' style={{color: 'green'}}></i> : <i className='fas fa-x' style={{color: 'red'}}></i>}</td>
                      <td>
                        <LinkContainer to={`/admin/user/${user.id}`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fa-solid fa-pen-to-square'></i>
                          </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user.id)}>
                          <i className='fa-trash-can fa-solid'></i>
                        </Button>
                      </td>
                    </tr>
                    
                    )}
                </tbody>

              </Table>

        }
        
    </div>
  )
}

export default UsersListPage
