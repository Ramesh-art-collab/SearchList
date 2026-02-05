import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';


const ProtectedRoute = ({children} : any) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

    return isAuth ? children : <Navigate to="/home" />;
};

export default ProtectedRoute;