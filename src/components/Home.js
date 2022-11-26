import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { useAuth0 } from '@auth0/auth0-react';
import Chart from './Chart'


//import Clients 
export default  function Home (){
    const { isAuthenticated } = useAuth0();
    const [clients, setClients] = useState([]);
    useEffect(() => {
        getClients();
    }, []);
    function getClients() {
        axios.get('http://localhost/dounkafa/serveur/api2/clients').then(function(response) {
            console.log(response.data);
            setClients(response.data);
        });
    }
    //import produit plus vendu
    const [Cat, setCat] = useState([]);
    useEffect(() => {
        getCat();
    }, []);
    function getCat() {
        axios.get('http://localhost/dounkafa/serveur/api_categorie/clients').then(function(response) {
            console.log(response.data);
            setCat(response.data);
        });
    }
    //import produit plus vendu
    const [produits, setProduits] = useState([]);
    useEffect(() => {
        getProduits();
    }, []);
    function getProduits() {
        axios.get('http://localhost/dounkafa/serveur/api_platPlusVendu/clients').then(function(response) {
            console.log(response.data);
            setProduits(response.data);
        });
    }
    //import points
    const [Livraisons, setLivraisons] = useState([]);
    useEffect(() => {
        getLivraisons();
    }, []);
    function getLivraisons() {
        axios.get('http://localhost/dounkafa/serveur/api_livraison/clients').then(function(response) {
            console.log(response.data);
            setLivraisons(response.data);
        });
    }
    //import points
    const [Livreur, setLivreur] = useState([]);
    useEffect(() => {
        getLivreur();
    }, []);
    function getLivreur() {
        axios.get('http://localhost/dounkafa/serveur/api_livraison/clients').then(function(response) {
            console.log(response.data);
            setLivreur(response.data);
        });
    }
     //import points
     const [points, setPoints] = useState([]);
     useEffect(() => {
         getPoints();
     }, []);
     function getPoints() {
         axios.get('http://localhost/dounkafa/serveur/api_points/clients').then(function(response) {
             console.log(response.data);
             setPoints(response.data);
         });
     }
    //import produit plus vendu
    const [Ventes, setVentes] = useState([]);
    useEffect(() => {
        getVentes();
    }, []);
    function getVentes() {
        axios.get('http://localhost/dounkafa/serveur/api_totalVente/clients').then(function(response) {
            console.log(response.data);
            setVentes(response.data);
        });
    }
    // liste des ventes
    const [Categories, setCategories] = useState([]);
    useEffect(() => {
        getCategorie();
    }, []);
    function getCategorie() {
        axios.get('http://localhost/dounkafa/serveur/api_cmdPlat1/clients').then(function(response) {
            console.log(response.data);
            setCategories(response.data);
        });
    }
    // liste des ventes
    const [TotalVente, setTotalVente] = useState([]);
    useEffect(() => {
        getTotalVente();
    }, []);
    function getTotalVente() {
        axios.get('http://localhost/dounkafa/serveur/api_cmdPlat/clients').then(function(response) {
            console.log(response.data);
            setTotalVente(response.data);
        });
    }
    // liste des ventes
    const [TqVendu, setTqVendu] = useState([]);
    useEffect(() => {
        getTqVendu();
    }, []);
    function getTqVendu() {
        axios.get('http://localhost/dounkafa/serveur/api_cmdPlat2/clients').then(function(response) {
            console.log(response.data);
            setTqVendu(response.data);
        });
    }
//plats
const [Plats, setPlats] = useState([]);
  useEffect(() => {
      getPlats();
  }, []);
  function getPlats() {
      axios.get('http://localhost/dounkafa/serveur/api_plat/clients').then(function(response) {
          console.log(response.data);
          setPlats(response.data);
      });
  }
  if (!isAuthenticated) {
    return ( <section id="hero-area" >
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slider/poulet-roti-a-l-orange-et-fenouil.jpg"
          
          alt="1"
        />
        <Carousel.Caption>
          <h3>Aw Dansé Restaurant Doun Ka Fa Gnè Kan</h3>
          <p>Vous remplir le ventre avec des produits de qualité est notre priorité.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slider/accompagnement.jpg"
          alt="2"
        />

        <Carousel.Caption>
        <h3>Aw Dansé Restaurant Doun Ka Fa Gnè Kan</h3>
          <p>Vous remplir le ventre avec des produits de qualité est notre priorité.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slider/poisson-entier-10800.jpg"
          alt="3"
        />

        <Carousel.Caption>
        <h3>Aw Dansé Restaurant Doun Ka Fa Gnè Kan</h3>
          <p>Vous remplir le ventre avec des produits de qualité est notre priorité.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </section>);
  }
        return (
        isAuthenticated && (
    <div className="home-container">
    <div className="container-fluid">
        <h1 className="mt-4">Tableau de bord</h1>
       
        <div className="row">
            <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4">
                    <div className="card-body">Total Gains</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        {Ventes.map((prod, key) =>
                        <span key={key} className="h6 mb-0">
                            {prod.total} Francs
                        </span>)
                        } 
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-success text-white mb-4">
                    <div className="card-body">Quantité de produits Vendus</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                    {TqVendu.map((t, key) =>
                    <span key={key} className="h6 mb-0">
                    {t.tq}
                    </span>
                    )}
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-warning text-white mb-4">
                    <div className="card-body">Nombre de Clients</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                    {clients.length}
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-danger text-white mb-4">
                    <div className="card-body">Ventes Effectuées</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                    {TotalVente.length}
                    </div>
                </div>
            </div>
        </div>
        <div className="center">
        <Chart/>
        </div>
        <div className="row">
            <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4">
                    <div className="card-body">Categories</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                    {Cat.length}
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-success text-white mb-4">
                    <div className="card-body">Total Plats</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                    {Plats.length}
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-warning text-white mb-4">
                    <div className="card-body">Livraisons</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                    {Livraisons.length}
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-danger text-white mb-4">
                    <div className="card-body">Livreurs</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                    {Livreur.length}
                    </div>
                </div>
            </div>
        </div>
       
    </div>
    
        <div className="row gx-2 gx-lg-3 mb-3 mb-lg-5">
            <div className="col-lg-6 mb-3 mb-lg-0">
            <div className="card h-100">
                <div className="card-header">
                <h5 className="card-header-title"><i className="tio-company"></i>Fidelité</h5>
                </div>
                <div className="card-body" id="business-overview-board">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Client</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {points.map((cat, key) =>
                            <tr key={key}>
                                <td>{key+1}</td>
                                {clients.map((cate, key) =>{ 
                                    return cat.clients_id === cate.id ?<td key={key}>{cate.prenom} {cate.nom}</td> :""}
                                  )}
                                <td>{cat.points}</td>
                            </tr>
                        )
                        } 
                    </tbody>
                </table>
                </div>
            </div>
            </div>
            <div className="col-lg-6">
            <div className="card h-100">
                <div className="card-header">
                <h5 className="card-header-title"><i className="tio-align-to-top"></i>Top 5 des Ventes de produits</h5>
                </div>
                <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Plat</th>
                            <th>Quantité Vendu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produits.map((prod, key) =>
                            <tr key={key}>
                                <td>{key+1}</td>
                                {Plats.map((cate, key) =>{ 
                                    return prod.plats_id === cate.id ?<td key={key}> {cate.nom}</td> :""}
                                  )}
                                <td>{prod.quantite}</td>
                            </tr>
                        )
                        } 
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
        <div className="row gx-2 gx-lg-3 mb-3 mb-lg-5">
            <div className="col-lg-6  mb-3 mb-lg-0">
            <div className="card h-100className">
                <div className="card-header"><h5 className="card-header-title float-left mb-2"><i className="tio-star"></i>Tout les produits Vendus</h5>
                <h5 className="card-header-title float-right mb-2"><i className="tio-star"></i>{Categories.length}</h5></div>
                <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Plat</th>
                            <th>Quantité Vendu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Categories.map((cat, key) =>
                            <tr key={key}>
                                <td>{key+1}</td>
                                {Plats.map((cate, key) =>{ 
                                    return cat.plats_id === cate.id ?<td key={key}> {cate.nom}</td> :""}
                                  )}
                                <td>{cat.quantite}</td>
                            </tr>
                        )
                        } 
                    </tbody>
                </table>
                </div>
            </div>
            </div>
            <div className="col-lg-6">
            <div className="card h-100">
                <div className="card-header">
                <h5  className="card-header-title float-left mb-2"><i className="tio-user"></i>Total clients </h5><i className="tio-poi-user"></i>
                <h5  className="card-header-title float-right mb-2"> {clients.length}</h5>
                </div>
                <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Telephone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, key) =>
                            <tr key={key}>
                                <td>{client.id}</td>
                                <td>{client.nom}</td>
                                <td>{client.prenom}</td>
                                <td>{client.telephone}</td>   
                            </tr>
                            
                        )
                        } 
                    </tbody>
                </table>
                </div>
                </div>
            </div>
            </div>
        </div>)
        );
}

