import React from 'react'
import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Plats() {
  const navigate = useNavigate();
 
const [inputs, setInputs] = useState([]);

const handleChange = (event) => {
    setSelected(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
}
const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios.post('http://localhost/dounkafa/serveur/api_plat/save', inputs).then(function(response){
        console.log(response.data);
        alert('success');
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
  const [selected, setSelected] = useState(Categories.value);
  console.log(selected);
    return (
        <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
        <h1>Creer Plat</h1>
        <form onSubmit={handleSubmit}>
            <select name="categories_id"  value={selected} onChange={handleChange} className="form-control">
                <option>---Choix de categorie---</option>
                {Categories.map(option => (
                <option key={option.id} value={option.id}>
                    {option.nom}
                </option>
                ))}
            </select>
            <div className="mb-3">
              <label>Nom</label>
              <input type="text" className="form-control" name="nom" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <input type="text" className="form-control" name="description" onChange={handleChange} required/>
            </div>
            <div className="mb-3">
              <label>Prix</label>
              <input type="text" className="form-control" name="prix" onChange={handleChange}required/>
            </div>
            <button type="submit" name="add" className="btn btn-primary">Enregister</button>
        </form>
        </div>
        <div className="col-2"></div>
    </div>
    )
}
