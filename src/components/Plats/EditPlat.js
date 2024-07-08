import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Plats()  {
  const navigate = useNavigate();
 
    const [inputs, setInputs] = useState([]);
 
    const {id} = useParams();
 
    useEffect(() => {
        getLivreur();
    });
 
    function getLivreur() {
        axios.get(`http://localhost/dounkafa/serveur/api_plat/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }
 
    const handleChange = (event) => {
        setSelected(event.target.value);
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`http://localhost/dounkafa/serveur/api_plat/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            alert('mise à jour');
            navigate('/plats');
        });
         
    }
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
  const [ setSelected] = useState(Categories.value);
    return (
      <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
            <h1>Modifier Plat</h1>
            <form onSubmit={handleSubmit}>
                <select name="categories_id"  value={inputs.categories_id} onChange={handleChange} className="form-control">
                    {Categories.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.nom}
                    </option>
                    ))}
                </select>
                <div className="mb-3">
                  <label>Nom</label>
                  <input type="text" value={inputs.nom || ''} className="form-control" name="nom" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <input type="text" value={inputs.description || ''} className="form-control" name="description" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Prix</label>
                  <input type="text" value={inputs.prix || ''} className="form-control" name="prix" onChange={handleChange} />
                </div>
                <button type="submit" name="update" className="btn btn-primary">Modifier</button>
            </form>
            </div>
            <div className="col-2"></div>
        </div>
    )
}