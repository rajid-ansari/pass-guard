import React, { useContext } from 'react'
import { useAuth } from '../contexts/UserContextProvider'

const Dashboard = () => {

  const { user } = useAuth();

  console.log(user.email)

  return (
  <div>{user.fullname}</div>
  )
}

export default Dashboard