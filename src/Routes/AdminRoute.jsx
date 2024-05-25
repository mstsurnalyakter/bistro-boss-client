
import PropTypes from 'prop-types'
import useAdmin from '../hooks/useAdmin'
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const { user,loading} = useAuth();
    const { isAdmin,  isAdminLoading } = useAdmin();
      const location = useLocation();

      if (loading || isAdminLoading) {
        return <h1>Loading...</h1>;
      }

      if (user && isAdmin) {
        return children;
      }
      return <Navigate to={"/login"} state={location?.pathname} replace />;
}

AdminRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AdminRoute