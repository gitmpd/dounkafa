import React from 'react'
import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Livraisons() {
  const navigate = useNavigate();
  const [date, setDate] = useState();
  console.log(date);
  const [inputs, setInputs] = useState([]);
const handleChange = (event) => {
    setSelected(event.target.value);
    setSelectedL(event.target.value);
    setDate(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
}
const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios.post('http://localhost/dounkafa/serveur/api_livraison/save', inputs).then(function(response){
        console.log(response.data);
        alert('success');
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
  const [selected, setSelected] = useState(Categories.value);

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
  const [selectedL, setSelectedL] = useState(Plats.value);
  
  console.log(selected);
    return (
        <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
        <h1>Creer Livraisons</h1>
        <form onSubmit={handleSubmit }>
            <select name="commander_plat_id"  value={selected} onChange={handleChange} className="form-control">
                <option>---Achat---</option>
                {Categories.map(option => (
                    <option key={option.id} value={option.id}>{Plats.map((cate, key) =>{ 
                                    return option.plats_id === cate.id ?<td key={key}>{option.id} -- {cate.nom}</td> :""}
                                  )}
                    </option>
                    ))}
            </select>
            <select name="livreur_id"  value={selectedL} onChange={handleChange} className="form-control">
                <option>---Livreur---</option>
                {Livreurs.map(options => (
                <option key={options.id} value={options.id}>
                   {options.prenom} {options.nom}
                </option>
                ))}
            </select>
            <div className="mb-3">
              <label>Date</label>
              <input type="date" className="form-control" name="date" onChange={handleChange} required/>
            </div>
            <div className="mb-3">
              <label>Frais de Transport</label>
              <input type="text" className="form-control" name="montant" onChange={handleChange} required/>
            </div>
            <div className="mb-3">
              <label>Lieu</label>
              <input type="text" className="form-control" name="lieu" onChange={handleChange}required/>
            </div>
            <button type="submit" name="add" className="btn btn-primary">Enregister</button>
        </form>
        </div>
        <div className="col-2"></div>
    </div>
    )
}
