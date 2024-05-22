import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../../pages';
// import { useAuthContext } from '../contexts';
// import { IPrivateRouteProps } from '../../@types/IPrivateRouteProps';

interface IPrivateRouteProps {
    isAuthenticated: boolean;
    children: any;
}
  

export const AppRoutes = () => {
    // const { isAuthenticated } = useAuthContext();
  
    // const PrivateRoute: React.FC<IPrivateRouteProps> = ({ isAuthenticated, children }) => {
    //     return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
    // };

    return (
      <Routes>
            <Route 
                path="/" 
                element={
                        <Home />
                } 
            />
      </Routes>
    );
  };
  
