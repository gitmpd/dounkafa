import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Menus() {
  const [livreurs, setLivreurs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [plats, setPlats] = useState([]);

  useEffect(() => {
    getLivreur();
    getCategorie();
    getPlat();
  }, []);

  function getLivreur() {
    axios.get('http://localhost/dounkafa/serveur/api_menu/clients')
      .then(response => {
        console.log(response.data);
        setLivreurs(response.data);
      })
      .catch(error => {
        console.error('Error fetching livreurs:', error);
      });
  }

  function getCategorie() {
    axios.get('http://localhost/dounkafa/serveur/api_categorie/clients')
      .then(response => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }

  function getPlat() {
    axios.get('http://localhost/dounkafa/serveur/api_plat/clients')
      .then(response => {
        console.log(response.data);
        setPlats(response.data);
      })
      .catch(error => {
        console.error('Error fetching plats:', error);
      });
  }

  return (
    <div className="container">
      <div className="row" id="Menu">
        <div className="col navMenu">
          {livreurs.map((livreur, key) => (
            livreur.id === 1 ? <h1 key={key} style={{ textAlign: "center" }}><strong>{livreur.titre}</strong></h1> : <h1 key={key} style={{ textAlign: "center" }}><strong></strong></h1>
          ))}
        </div>
      </div>
      <div className="row bg-light">
        {categories.map((cat, key) => (
          <div key={key} className="col-md-4" data-aos="slide-up">
            <div className="card view zoom">
              <img className="card-img-top img-fluid" src={`/images/slider/${cat.photo}`} alt={cat.nom} width='70%' />
              <div className="card-body">
                <h5 className="card-title"><strong>{cat.nom}</strong></h5>
                <p>{cat.libelle}</p>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nom</th>
                      <th>Prix</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plats.map((plat, key) => (
                      cat.id === plat.categories_id &&
                      <tr key={key}>
                        <td>{plat.id}</td>
                        <td>{plat.nom}</td>
                        <td>{plat.prix}</td>
                        <td>
                          <Link to={`/menus/${plat.id}/editCmd`} className="btn btn-success" style={{ marginRight: "10px" }}>Acheter</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
