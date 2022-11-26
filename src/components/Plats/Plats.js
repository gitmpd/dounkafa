import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Plats ()  {
 
  const [Categories, setCategories] = useState([]);
  useEffect(() => {
      getCategorie();
  }, []);
  function getCategorie() {
      axios.get('http://localhost/dounkafa/serveur/api_categorie/clients').then(function(response) {
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
    axios.delete(`http://localhost/dounkafa/serveur/api_plat/${id}/delete`).then(function(response){
        console.log(response.data);
        getplat();
    });}
}
    return (
      <div>
        <div className="container">
                  <div className="card-body"> 
                  <h1>Liste Plats </h1>
        <div className="mb-3"><Link to="/plats/CreatePlat" className="btn btn-primary btn-xs "><strong>Ajouter</strong></Link></div>
        
                    <table className="table table-bordered table-striped">
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Categorie</th>
                              <th>Nom</th>
                              <th>Description</th>
                              <th>Prix</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody >
                      {Plats.map((plat, key) =>
                              <tr key={key}>
                                  <td>{plat.id}</td>
                                  {Categories.map((cat, key) =>{ 
                                    return plat.categories_id === cat.id ?<td key={key}>{cat.nom}</td> :""}
                                  )}
                                  <td>{plat.nom}</td>
                                  <td>{plat.description}</td>
                                  <td>{plat.prix}</td>
                                  <td>
                                      <Link to={`/plats/${plat.id}/EditPlat`} className="btn btn-success" style={{marginRight: "10px"}}>Modifier</Link>
                                      <button onClick={() => deleteLivreurs(plat.id)} className="btn btn-danger">Delete</button>
                                  </td>
                              </tr> 
                     )}</tbody>
                     </table>
                  </div> 
              
        <br />
    </div>
      </div>
    )
  
}
