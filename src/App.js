import React from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import { CDBFooter, CDBFooterLink, CDBBtn, CDBIcon, CDBBox } from 'cdbreact';

//import Navbar from "./components/Navbar";
import {NavLink } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import Profile from "./components/user/Profile";
import Home from './components/Home';
import Chart from "./components/Chart";
import Menus from './components/Menus/Menus';
import Commandes from './components/Commandes/Commandes';
import Clients from './components/Clients/Clients';
import CreerClt from './components/Clients/CreerClt';
import EditClt from './components/Clients/EditClt';
import Livreurs from "./components/Livreurs/Livreurs";
import Livraisons from "./components/Livreurs/Livraisons";
import CreerLivraison from "./components/Livreurs/CreerLivraison";
import EditLivraison from "./components/Livreurs/EditLivraison";
import CreerLivreur from './components/Livreurs/CreerLivreur';
import EditLivreur from './components/Livreurs/EditLivreur';
import ListerMenu from './components/Menus/ListerMenu';
import ListeMenu from './components/Menus/ListeMenu';
import ModifieMenu from './components/Menus/ModifieMenu';
import CreerMenu from './components/Menus/CreerMenu';
import CreateMenu from './components/Menus/CreateMenu';
import EditMenu from './components/Menus/EditMenu';
import EditCmd from './components/Commandes/EditCmd';
import Plats from './components/Plats/Plats';
import EditPlat from './components/Plats/EditPlat';
import CreatePlat from './components/Plats/CreatePlat';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
 const { isLoading, error } = useAuth0();

 return (
   <main className="column">
     {error && <p>Authentication Error</p>}
     {!error && isLoading && <p>Loading...</p>}
     {!error && !isLoading && (
       <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand eventkey="1" as={Link}  to="/">Accueil</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                  <NavLink eventKey="2" as={Link}  to="/menus">Menus</NavLink>
              </Nav>
              <Nav className="ml-auto">
                  <LoginButton />
                  <LogoutButton />
               </Nav>
                   <Profile />
            </Navbar.Collapse>
          </Container>
        </Navbar>
         <Routes>
         <Route path="/c" element={ <Chart/> } />
          <Route path="/" element={ <Home/> } />
          <Route path="/menus" element={<Menus/> } />
          <Route path="/cmd" element={<Commandes/> } />
          <Route path="/menus/:id/editCmd" element={<EditCmd/>} />
          <Route path="/clients" element={<Clients/> } />
          <Route path="/clients/creerClt" element={ <CreerClt/> } />
          <Route path="/clients/:id/editClt" element={<EditClt/>} />
          <Route path="/livreurs" element={<Livreurs/> } />
          <Route path="/livreurs/creerLivreur" element={ <CreerLivreur/> } />
          <Route path="/livreurs/:id/editLivreur" element={<EditLivreur/>} />
          <Route path="/ListerMenu" element={<ListerMenu/> }/>
          <Route path="/ListerMenu/CreerMenu" element={<CreerMenu/> } />
          <Route path="/ListerMenu/:id/EditMenu" element={<EditMenu/> } />
          <Route path="/listemenu" element={<ListeMenu/> }/>
          <Route path="/listemenu/CreateMenu" element={<CreateMenu/> }/>
          <Route path="/listemenu/:id/modifieMenu" element={<ModifieMenu/> } />
          <Route path="/plats" element={<Plats/> } />
          <Route path="/plats/CreatePlat" element={<CreatePlat/> } />
          <Route path="/plats/:id/EditPlat" element={<EditPlat/> } />
          <Route path="/livraisons" element={<Livraisons/> } />
          <Route path="/livraisons/CreerLivraison" element={ <CreerLivraison/> } />
          <Route path="/livraisons/:id/EditLivraison" element={<EditLivraison/>} />
        </Routes>
        <CDBFooter className="shadow">
      <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }}>
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox>
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <span className="ml-3 h5 font-weight-bold">MPD&&BBH service</span>
            </a>
            <p className="my-3" style={{ width: '250px' }}>
            Nous créons des ressources et des outils de haute qualité pour aider les restaurants à facilité la realisation de leurs projets de site web.
            </p>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Doun Ka Fa
            </p>
            <CDBBox flex="column" display="flex" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBFooterLink href="/">Resources</CDBFooterLink>
              <CDBFooterLink href="/">About Us</CDBFooterLink>
              <CDBFooterLink href="/">Contact</CDBFooterLink>
              <CDBFooterLink href="/">Blog</CDBFooterLink>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Aide
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBFooterLink href="/">Support</CDBFooterLink>
              <CDBFooterLink href="/">Sign Up</CDBFooterLink>
              <CDBFooterLink href="/">Sign In</CDBFooterLink>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Produits
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBFooterLink href="/">Windframe</CDBFooterLink>
              <CDBFooterLink href="/">Loop</CDBFooterLink>
              <CDBFooterLink href="/">Contrast</CDBFooterLink>
            </CDBBox>
          </CDBBox>
        </CDBBox>
        <CDBBox
          display="flex"
          justifyContent="center"
          style={{ width: '100%' }}
          className="mx-auto mt-4"
        >
          <CDBBtn flat color="primary" className="p-2">
            <CDBIcon fab icon="FaFacebookF"/>
          </CDBBtn>
          <CDBBtn flat color="primary" className="mx-3 p-2">
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
          <CDBBtn flat color="primary" className="p-2">
            <CDBIcon fab icon="instagram" />
          </CDBBtn>
        </CDBBox>
        <small className="text-center mt-5">Copyright &copy;2022 by Mohamedpapadiarra et BBH</small>
      </CDBBox>
    </CDBFooter>
       </>
     )}
   </main>
 );
}

export default App;
