import React from 'react'
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Livreurs () {
    const [livreurs, setLivreurs] = useState([]);
    useEffect(() => {
        getLivreur();
    }, []);
    function getLivreur() {
        axios.get('http://localhost/dounkafa/serveur/api_livreur/livreurs').then(function(response) {
            console.log(response.data);
            setLivreurs(response.data);
        });
    }
 
    const deleteLivreurs = (id) => {
        if (window.confirm('etes-vous sure de vouloir supprimer cet element ?')) {
        axios.delete(`http://localhost/dounkafa/serveur/api_livreur/${id}/delete`).then(function(response){
            console.log(response.data);
            getLivreur();
        });}
    }
    return (
        <div className="container">
        <div className="card-body">
        <h1>Liste Livreurs </h1>
        <div className="mb-3"><Link to="/livreurs/creerLivreur" className="btn btn-primary btn-xs "><strong>Ajouter</strong></Link></div>
        
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Telephone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {livreurs.map((livreur, key) =>
                    <tr key={key}>
                        <td>{livreur.id}</td>
                        <td>{livreur.nom}</td>
                        <td>{livreur.prenom}</td>
                        <td>{livreur.telephone}</td>
                        <td>
                            <Link to={`/livreurs/${livreur.id}/editLivreur`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                            <button onClick={() => deleteLivreurs(livreur.id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                )} 
            </tbody>
        </table>
        </div>
    </div>
    )
}
