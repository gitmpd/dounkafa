import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Plats()  {
  const navigate = useNavigate();
 
    const [inputs, setInputs] = useState([]);
 
    const {id} = useParams();
 
    useEffect(() => {
        getLivraison();
    });
 
    function getLivraison() {
        axios.get(`http://localhost/dounkafa/serveur/api_livraison/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }
 
    const handleChange = (event) => {
        setSelected(event.target.value);
        setSelectedl(event.target.value);
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`http://localhost/dounkafa/serveur/api_livraison/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            alert('mise à jour');
            navigate('/livraisons');
        });
         
    }
    const [Categories, setCategories] = useState([]);
  useEffect(() => {
      getCategorie();
  }, []);
  function getCategorie() {
      axios.get('http://localhost/dounkafa/serveur/api_cmdPlat/clients').then(function(response) {
          console.log(response.data);
          setCategories(response.data);
      });
  }

  const [Livreurs, setLivreurs] = useState([]);
  useEffect(() => {
      getLivreurs();
  }, []);
  function getLivreurs() {
      axios.get('http://localhost/dounkafa/serveur/api_livreur/clients').then(function(response) {
          console.log(response.data);
          setLivreurs(response.data);
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
  const [setSelected] = useState(Categories.value);
  const [setSelectedl] = useState(Categories.value);
    return (
      <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
            <h1>Modifier Livraison</h1>
            <form onSubmit={handleSubmit}>
            <label>Achat</label>
                <select name="commander_plat_id"  value={inputs.commander_plat_id} onChange={handleChange} className="form-control">
                    {Categories.map(option => (
                    <option key={option.id} value={option.id}>{Plats.map((cate, key) =>{ 
                                    return option.plats_id === cate.id ? <p key={key}>{cate.nom}</p>  :""}
                                  )}
                    </option>
                    ))}
                </select>
                <label>Livreur</label>
                <select name="livreurs_id"  value={inputs.livreurs_id} onChange={handleChange} className="form-control">
                    {Livreurs.map(option => (
                    <option key={option.id} value={option.id}>
                       {option.prenom} {option.nom}
                    </option>
                    ))}
                </select>
                <div className="mb-3">
                  <label>Date</label>
                  <input type="text" value={inputs.date || ''} className="form-control" name="date" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Montant</label>
                  <input type="text" value={inputs.montant || ''} className="form-control" name="montant" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Lieu</label>
                  <input type="text" value={inputs.lieu || ''} className="form-control" name="lieu" onChange={handleChange} />
                </div>
                <button type="submit" name="update" className="btn btn-primary">Modifier</button>
            </form>
            </div>
            <div className="col-2"></div>
        </div>
    )
}