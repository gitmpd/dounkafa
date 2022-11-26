import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Clients() {
  const navigate = useNavigate();
 
const [inputs, setInputs] = useState([]);

const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
}
const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost/dounkafa/serveur/api2/save', inputs).then(function(response){
        console.log(response.data);
        alert("success");
        navigate('/clients');
        
    });
     
}
    return (
        <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
        <h1>Creer Client</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Nom</label>
              <input type="text" className="form-control" name="nom" onChange={handleChange} required/>
            </div>
            <div className="mb-3">
              <label>Prenom</label>
              <input type="text" className="form-control" name="prenom" onChange={handleChange} required/>
            </div>
            <div className="mb-3">
              <label>Telephone</label>
              <input type="text" className="form-control" name="telephone" onChange={handleChange} required/>
            </div>
            <div className="mb-3">
              <label>adresse</label>
              <input type="text" className="form-control" name="adresse" onChange={handleChange} required/>
            </div>    
            <button type="submit" name="add" className="btn btn-primary">Enregister</button>
        </form>
        </div>
        <div className="col-2"></div>
    </div>
    )
}
