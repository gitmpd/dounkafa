import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Menus ()  {
  const [Platcs, setPlatcs] = useState([]);
  useEffect(() => {
      getPlatcs();
  }, []);
  function getPlatcs() {
      axios.get('http://localhost/dounkafa/serveur/api_cmdPlat/clients').then(function(response) {
          console.log(response.data);
          setPlatcs(response.data);
      });
  }

  const [Categories, setCategories] = useState([]);
  useEffect(() => {
      getCategorie();
  }, []);
  function getCategorie() {
      axios.get('http://localhost/dounkafa/serveur/api2/clients').then(function(response) {
          console.log(response.data);
          setCategories(response.data);
      });
  }

  const [Plats, setplats] = useState([]);
  useEffect(() => {
      getplat();
  }, []);
  function getplat() {
      axios.get('http://localhost/dounkafa/serveur/api_plat/clients').then(function(response) {
          console.log(response.data);
          setplats(response.data);
      });
  }
  const deleteLivreurs = (id) => {
    if (window.confirm('etes-vous sure de vouloir supprimer cet element ?')) {
    axios.delete(`http://localhost/dounkafa/serveur/api_cmdPlat/${id}/delete`).then(function(response){
        console.log(response.data);
        getPlatcs();
    });}
}
    return (
      <div>
        <div className="container">
                  <div className="card-body"> 
                  <h1>Liste des Ventes </h1>
                  <div className="mb-3"><Link to="/menus" className="btn btn-primary btn-xs "><strong>Ajouter</strong></Link></div>
                    <table className="table table-bordered table-striped">
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Client</th>
                              <th>Plat</th>
                              <th>Quantité</th>
                              <th>Montant</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody >
                      {Platcs.map((platc, key) =>
                              <tr key={key}>
                                  <td>{platc.id}</td>
                                  {Categories.map((cat, key) =>{ 
                                    return platc.clients_id === cat.id ?<td key={key}>{cat.prenom} {cat.nom}</td> : ''}
                                  )}
                                   {Plats.map((plat, key) =>{ 
                                    return platc.plats_id === plat.id ?<td key={key}>{plat.nom}</td> :""}
                                  )}
                                  <td>{platc.quantite}</td>
                                  <td>{platc.montant}</td>
                                  <td>
                                      <button onClick={() => deleteLivreurs(platc.id)} className="btn btn-danger">Delete</button>
                                  </td>
                              </tr> 
                     )}</tbody>
                     </table>
                  </div> 
              </div>
            </div>
    )
  
}
