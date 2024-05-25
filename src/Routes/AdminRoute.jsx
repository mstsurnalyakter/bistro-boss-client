import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute =({children}) => {
  const { user, loading } = useAuth();
  const { isAdmin, isAdminLoading } = useAdmin();
const location = useLocation();


  if (loading || isAdminLoading) {
    return <p>Login....................</p>

  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to='/' state={location?.pathname} replace />
}

AdminRoute.propTypes = {
  children:PropTypes.element
}

export default AdminRoute