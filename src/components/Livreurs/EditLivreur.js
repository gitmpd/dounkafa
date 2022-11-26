import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Livreurs()  {
  const navigate = useNavigate();
 
    const [inputs, setInputs] = useState([]);
 
    const {id} = useParams();
 
    useEffect(() => {
        getLivreur();
    }, []);
 
    function getLivreur() {
        axios.get(`http://localhost/dounkafa/serveur/api_livreur/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }
 
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`http://localhost/dounkafa/serveur/api_livreur/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            alert('mise à jour');
            navigate('/livreurs');
        });
         
    }

    return (
      <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
            <h1>Modifier Livreurs</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Nom</label>
                  <input type="text" value={inputs.nom || ''} className="form-control" name="nom" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Prenom</label>
                  <input type="text" value={inputs.prenom || ''} className="form-control" name="prenom" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Telephone</label>
                  <input type="text" value={inputs.telephone || ''} className="form-control" name="telephone" onChange={handleChange} />
                </div>
                <button type="submit" name="update" className="btn btn-primary">Modifier</button>
            </form>
            </div>
            <div className="col-2"></div>
        </div>
    )
}
