import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CreerMenu () {

  //Categories
  const navigate = useNavigate();
 
  const [inputs, setInputs] = useState([]);
  const [file, setFile] = useState();
  const handleChange = (event) => {
    console.log(event.target.files);
     console.log(event.target.value);
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value, 'menus_id': 1}));
      setFile(URL.createObjectURL(event.target.files[0]));
  }
  console.log(inputs);
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(inputs);
      axios.post('http://localhost/dounkafa/serveur/api_categorie/save', inputs).then(function(response){
        alert('success');
          console.log(response.data);
          navigate('/ListerMenu');
      });
       
  }
        return (
            <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
            <h1>Creer Categorie</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Nom</label>
                  <input type="text" className="form-control" name="nom" onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                  <label>Libelle</label>
                  <input type="text" className="form-control" name="libelle" onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                  <label>Photo</label>
                  <input lang="es" type="file" id="customFileLang" name="photo" className="form-control visibility-hidden form-control-file" onChange={handleChange} required/>
                </div>
                <img src={file} alt=""/>
                <button type="submit" name="add" className="btn btn-primary">Enregister</button>
            </form>
            </div>
            <div className="col-2"></div>
        </div>
        )
}
