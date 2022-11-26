import React from 'react'
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Clients () {
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
 
    const deleteClients = (id) => {
        if (window.confirm('etes-vous sure de vouloir supprimer cet element ?')) {
        axios.delete(`http://localhost/dounkafa/serveur/api2/${id}/delete`).then(function(response){
            console.log(response.data);
            getClients();
        });}
    }
    return (
        <div className="container">
        <div className="card-body">
        <h1>Liste Clients </h1>
        <div className="mb-3"><Link to="/clients/creerClt" className="btn btn-primary btn-xs "><strong>Ajouter</strong></Link></div>
        
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Telephone</th>
                    <th>Adresse</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client, key) =>
                    <tr key={key}>
                        <td>{client.id}</td>
                        <td>{client.nom}</td>
                        <td>{client.prenom}</td>
                        <td>{client.telephone}</td>
                        <td>{client.adresse}</td>
                        <td>
                            <Link to={`/clients/${client.id}/editClt`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                            <button onClick={() => deleteClients(client.id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                )}
                 
            </tbody>
        </table>
        </div>
    </div>
    )
}
