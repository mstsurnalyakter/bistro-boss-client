
import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router';

const PrivateRoute =({children})=> {

  const {user,loading} = useAuth();
  const location = useLocation()
  if(loading){
    return <h1>Loading...</h1>
  }
  if(user){
    return children;
  }
  return <Navigate to={'/login'} state={location.pathname} replace/>
}

PrivateRoute.propTypes = {
    children: PropTypes.element.isRequired,
}

export default PrivateRoute