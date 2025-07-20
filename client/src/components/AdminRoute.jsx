import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const AdminRoute = ({ children }) => {
  const { userInfo } = useAuthStore();

  if (userInfo && userInfo.isAdmin) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;