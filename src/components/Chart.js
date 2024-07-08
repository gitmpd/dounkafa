import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Enregistrement des éléments nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Nombre de client',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(99, 132, 0.5)',
      },
      {
        label: 'Quantité vendue',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 235, 0.5)',
      },
    ],
  });

  const fetchData = async () => {
    const url = 'http://localhost/dounkafa/serveur/api_cmdPlat1/clients';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const dataFromApi = await response.json();
      console.log(dataFromApi); // Vérifiez que plat_nom est bien présent dans les données
      const platSet = [];
      const dataSet1 = [];
      const dataSet2 = [];
  
      dataFromApi.forEach((item) => {
        platSet.push(item.plat_nom); // Utilisation de plat_nom
        dataSet1.push(item.clients_id);
        dataSet2.push(item.quantite);
      });
  
      setData({
        labels: platSet,
        datasets: [
          {
            label: 'Client',
            data: dataSet1,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(99, 132, 0.5)',
          },
          {
            label: 'Quantité vendue',
            data: dataSet2,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 235, 0.5)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  

  return (
    <div style={{ width: '100%', height: '50%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

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

export default Chart;
