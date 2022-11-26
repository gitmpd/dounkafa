import React from 'react'
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Livraisons () {
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

  const [Categories, setCategories] = useState([]);
  useEffect(() => {
      getCategorie();
  }, []);
  function getCategorie() {
      axios.get('http://localhost/dounkafa/serveur/api_livraison/clients').then(function(response) {
          console.log(response.data);
          setCategories(response.data);
      });
  }

  const [Livreur, setplats] = useState([]);
  useEffect(() => {
      getplat();
  }, []);
  function getplat() {
      axios.get('http://localhost/dounkafa/serveur/api_livreur/clients').then(function(response) {
          console.log(response.data);
          setplats(response.data);
      });
  }
  const deleteLivreurs = (id) => {
    if (window.confirm('etes-vous sure de vouloir supprimer cet element ?')) {
    axios.delete(`http://localhost/dounkafa/serveur/api_livraison/${id}/delete`).then(function(response){
        console.log(response.data);
        getCategorie();
    });}
}
    return (
        <div className="container">
        <div className="card-body">
        <h1>Liste Livraisons </h1>
        <div className="mb-3"><Link to="/livraisons/CreerLivraison" className="btn btn-primary btn-xs "><strong>Ajouter</strong></Link></div>
        
        <table className="table table-bordered table-striped">
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Plat Acheté</th>
                              <th>Livreur</th>
                              <th>date</th>
                              <th>Montant</th>
                              <th>Lieu</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody >
                      {Categories.map((platc, key) =>
                              <tr key={key}>
                                  <td>{platc.id}</td>
                                  {Platcs.map((cat, key) =>{ 
                                    return platc.commander_plat_id === cat.id ?<td key={key}>{Plats.map((cate, key) =>{ 
                                        return cat.plats_id === cate.id ? <p key={key}>{platc.commander_plat_id}--{cate.nom}</p>  :""}
                                      )}</td> :""}
                                  )}
                                   {Livreur.map((plat, key) =>{ 
                                    return platc.livreur_id === plat.id ?<td key={key}>{plat.prenom} {plat.nom}</td> :""}
                                  )}
                                  <td>{platc.date}</td>
                                  <td>{platc.montant}</td>
                                  <td>{platc.lieu}</td>
                                  <td>
                                      <Link to={`/livraisons/${platc.id}/EditLivraison`} className="btn btn-success" style={{marginRight: "10px"}}>Modifier</Link>
                                      <button onClick={() => deleteLivreurs(platc.id)} className="btn btn-danger">Delete</button>
                                 </td>
                              </tr> 
                     )}</tbody>
             </table>
        </div>
    </div>
    )
}
