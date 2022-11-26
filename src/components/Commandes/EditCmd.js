import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCmd() {
    //Plat selectionné
    const navigate = useNavigate();
    
    const {id} = useParams();
    
    const [inputs, setInputs] = useState([]);
    useEffect(() => {
        getplat();
    }, []);

    const [Plat, setPlat] = useState([]);
    useEffect(() => {
        getplat();
    }, []);
    function getplat() {
        axios.get(`http://localhost/dounkafa/serveur/api_plat/${id}`).then(function(response) {
            console.log(response.data);
            setPlat(response.data);
            setInputs(values => ({...values, "plats_id": response.data.id, "points": 5}));
            
            console.log(setInputs);
        });
        }
    const handleChange = (event) => {
        setSelected(event.target.value);
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
       
    }

    console.log(inputs);
//Requete pour commande
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        axios.post('http://localhost/dounkafa/serveur/api_cmdPlat/save', inputs).then(function(response){
            console.log(response.data);
            navigate('/menus');
            alert('success');
            console.log(inputs);
        },[])
          
         
    }
    //Liste des clients
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
    const [selected, setSelected] = useState(clients.value);
    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
            <h1>Acheter</h1>
            <Link to="/menus" className="btn btn-primary btn-xs">Return</Link>
            <form onSubmit={handleSubmit}>
                <label>Nom Client</label>
                <select name="clients_id"  value={selected} onChange={handleChange} className="form-control" >
                    <option>----Choisir un client----</option>
                    {clients.map(option => (
                    <option key={option.id} value={option.id} >
                      {option.prenom} {option.nom}
                    </option>
                    ))}
                </select>
                <div className="row">
                    <div className="col">
                    <label>ID Plat</label>
                    <input type="text" value={Plat.id} className="form-control" name="plats_id" onChange={handleChange} readOnly/>
                    </div>
                    <div className="col">
                    <label>Nom Plat</label>
                    <input type="text" value={Plat.nom ||''} className="form-control" readOnly/>
                    </div>
                </div>
                <div className="row">
                <div className="col mb-3">
                  <label>Quantité</label>
                  <input type="text" className="form-control" name="quantite" onChange={handleChange} required />
                </div>  
                <div className="col mb-3">
                  <label>Montant</label>
                  <input type="text" name="montant" value={inputs.quantite*Plat.prix || ''}  className="form-control" onChange={handleChange} />
                </div> 
                </div>
                <button type="submit" name="add" className="btn btn-primary">Envoyer</button>
                
            </form>
            </div>
            <div className="col-2"></div>
        </div>
    )
}