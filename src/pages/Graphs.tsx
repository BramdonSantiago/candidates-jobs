import AsideComponent from '../components/AsideComponent';

import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import COUNTRIES from '../constants/countries';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels, ArcElement);


const Graphs = () => {
    const data = {
    labels: ['México', 'Canadá', 'Spain', 'USA', 'Netherlands'],
        datasets: [
        {
            label: 'Country',
            data: [12, 19, 3, 5, 4],
            backgroundColor: '#a9dfd8',
        },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Top 5 candidates by country' },
        },
    };


    const data2 = {
        labels: ["Today", "On this week", "On this month"],
        datasets: [
            {
                label: "Candidates aggregates",
                data: [3, 8, 20],
                backgroundColor: ["#fcb859", "#a9dfd8", "#f2c8ed"],
            },
        ],
    };
    const options2 = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
        },
        scales: { y: { beginAtZero: true, stepSize: 1 } },
    };


    const data3 = {
        labels: ["México"],
        datasets: [
            {
                label: "Candidates to relocate",
                data: [3],
                backgroundColor: ["#a9dfd8"], 
                borderWidth: 0,
            },
        ],
    };
    const options3 = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%", 
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Candidates to relocate' },
        },
    };

    return (
        <div className='grid grid-cols-12'>
            <aside className='col-span-1'>
                <AsideComponent></AsideComponent>
            </aside>
            <div className='col-span-11 py-4 px-10'>
                <div>
                    <h1 className="text-3xl mb-10 text-center">Graphs</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className='box-section'>
                            <span>Filter by country:</span>
                            <select name="" id="">
                                <option value="0" selected disabled>Choose a option</option>
                                {COUNTRIES.map((c: any) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                            <div style={{height: '15rem'}}>
                                <Doughnut data={data3} options={options3} />
                            </div>
                        </div>
                        <div className='box-section'>
                            <div style={{height: '15rem'}}>
                                <Bar data={data} options={options} />
                            </div>
                        </div>
                        <div className='box-section'>
                            <div style={{height: '15rem'}}>
                                <Bar data={data2} options={options2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Graphs;