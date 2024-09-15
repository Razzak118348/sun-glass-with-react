
import useAuth from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
    const { user ,loading} = useAuth();
    const location = useLocation();


    if (loading) {
        return <h1 className="text-4xl text-center"><span className="loading loading-ring loading-lg"></span> </h1>
    }

    if (!user) {
        return <Navigate to='/login' state={location?.pathname || '/'} />
    }
    return (
        <div>
            {children}
        </div>
    );
};

PrivateRoute.propTypes={
children:PropTypes.node,
}

export default PrivateRoute;