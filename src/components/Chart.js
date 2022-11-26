import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import axios from 'axios';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Ventes par plat et client',
      },
    },
  };

const Chart =() => {
    
    const [data, setData] = useState({
        labels:['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: 'Nombre de client',
            data:[],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(25, 90, 13, 0.5)',
          },
          {
            label: 'Quantité vendu',
            data:[],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
    useEffect(()=> {
       const fetchData= async()=> {
           const url = 'http://localhost/dounkafa/serveur/api_cmdPlat1/clients'
           const url1 = 'http://localhost/dounkafa/serveur/api_plat/clients'
           const labelSet = [];
           const platSet = [];
           const dataSet1 = [];
           const dataSet2 = [];
           /*fetch(url1).then((plats)=> {
            console.log("plat data", plats)
            const resp = plats.json();
            return resp
        }).then((resp) => {
            console.log("platsss", resp)
            for (const p of resp) {
                for(const pc of platSet){
                    if(p.id === pc){
                        labelSet.push(p.nom);
                    }
                }
            }
            console.log("nomplat", labelSet, platSet)
        })  */
         await fetch(url).then((data)=> {
             console.log("Api data", data)
             const res = data.json();
             return res
         }).then((res) => {
             console.log("ressss", res)
            for (const val of res) {
                dataSet1.push(val.clients_id)
                dataSet2.push(val.quantite)
                platSet.push(val.plats_id)
            }      
            setData({
                labels:platSet,
                datasets: [
                  {
                    label: 'Client',
                    data:dataSet1,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(99, 132, 0.5)',
                  },
                  {
                    label: 'Quantité vendu',
                    data:dataSet2,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 235, 0.5)',
                  },
                ],
              })
            console.log("arrData", dataSet1, dataSet2)
         }).catch(e => {
                console.log("error", e)
            })
        }
        
        fetchData();
    },[])
    
    return(
        <div style={{width:'100%', height:'50%'}}>
            {
                console.log("dataaaaaaaa", data)
            }
            
            <Bar data={data} options={options}/>
         </div>)
}
export default Chart;