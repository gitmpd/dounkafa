import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" type="button" onClick={() => loginWithRedirect()}>
               Connexion
            </button>
            </div>
        )
    )
}

export default LoginButton