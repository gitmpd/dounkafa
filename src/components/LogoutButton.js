import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Link
  } from "react-router-dom";
import { NavLink,NavDropdown } from "react-bootstrap";
const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <>
            <NavLink eventKey="2" as={Link}  to="/cmd">Ventes</NavLink>
            <NavDropdown title="Parametres" id="basic-nav-dropdown" responsive='lg-left'>
                      <NavDropdown.Item as={Link}  to="/plats">Plats</NavDropdown.Item>
                      <NavDropdown.Item as={Link}  to="/ListerMenu"> Menu Categories</NavDropdown.Item>
                      <NavDropdown.Item as={Link}  to="/clients">
                                  Clients
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link}  to="/livreurs">livreurs</NavDropdown.Item>
                      <NavDropdown.Item as={Link}  to="/livraisons">livraisons</NavDropdown.Item>
            </NavDropdown>
            <div>
            <button className="btn btn-primary" type="button" onClick={() => logout()}> Deconnexion</button>
            </div>
            </>
        )
    )
}

export default LogoutButton