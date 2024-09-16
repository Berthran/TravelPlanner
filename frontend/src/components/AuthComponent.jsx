import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AuthComponent = () => {
    const { authToken } = useContext(AuthContext);

    return (
        <div>
            {authToken ? <p>Authenticated</p> : <p>Please login</p>}
        </div>
    );
};

export default AuthComponent;
