import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, ...otherProps}) => {
  const currentUser = useSelector(state => state.user.currentUser)
  return (
      <Route {...otherProps} render={(props) => (
          currentUser
              ? <Component {...props} />
              : <Redirect to='/signin' />
      )} />
  )
}

export default PrivateRoute