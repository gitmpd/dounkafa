
import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function EditMenu ()  {
    const navigate = useNavigate();
 
    const [inputs, setInputs] = useState([]);
 
    const {id} = useParams();
 
    useEffect(() => {
        getLivreur();
    }, []);
 
    function getLivreur() {
        axios.get(`http://localhost/dounkafa/serveur/api_categorie/${id}`).then(function(response) {
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
        
        axios.put(`http://localhost/dounkafa/serveur/api_categorie/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            alert('mise à jour');
            navigate('/ListerMenu');
        });
         
    }
    //Client

    const [clients, setClients] = useState([]);
    useEffect(() => {
        getClients();
    }, []);
    function getClients() {
        axios.get('http://localhost/dounkafa/serveur/api_menu/clients').then(function(response) {
            console.log(response.data);
            setClients(response.data);
        });
    }

    const [selected, setSelected] = useState(clients.value);

    return (
      <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
            <h1>Modifier Categories Menu</h1>
            <Link to="/ListerMenu" className="btn btn-primary btn-xs">Return</Link>
            <form onSubmit={handleSubmit}>
                
                <select name="menus_id"  value={selected} onChange={handleChange} className="form-control">
                    {clients.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.id}
                    </option>
                    ))}
                </select>
                <div className="mb-3">
                  <label>Nom</label>
                  <input type="text" value={inputs.nom || ''} className="form-control" name="nom" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Libelle</label>
                  <input type="text" value={inputs.libelle || ''} className="form-control" name="libelle" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Photo</label>
                  <input type="file" value={''} className="form-control" name="photo" onChange={handleChange}/>
                </div>
                <button type="submit" name="update" className="btn btn-primary">Modifier</button>
            </form>
            </div>
            <div className="col-2"></div>
        </div>
    )
}
