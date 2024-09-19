import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AuthComponent = ({ children }) => {
    const { authToken } = useContext(AuthContext);

    return (
        <div>
            {authToken ? children : <p>Please login</p>}
        </div>
    );
};

export default AuthComponent;
