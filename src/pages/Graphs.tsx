import AsideComponent from '../components/AsideComponent';
import { useSelector } from 'react-redux';
import type { RootState } from '../store'
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import COUNTRIES from '../constants/countries';
import { useState, useEffect } from "react";
import { isThisMonth, isThisWeek, isToday, parseISO } from "date-fns";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels, ArcElement);


const Graphs = () => {
    const candidates = useSelector((state: RootState) => state.saveCandidates.data);

    const [filterCountry, setFilterCountry] = useState(COUNTRIES[0]);
    const [relocationCount, setRelocationCount] = useState(0);
    const [top3Countries, setTop3Countries] = useState<{ country: any; count: any }[]>([])
    const [candidatesToday, setCandidatesToday] = useState(0);
    const [candidatesWeek, setCandidatesWeek] = useState(0);
    const [candidatesMonth, setCandidatesMonth] = useState(0);

    useEffect(() => {
        relocationCountryCounts(filterCountry);
    }, [filterCountry]);

    useEffect(() => {
        const top3 = getTop3Countries(candidates);
        setTop3Countries(top3);
    }, []);

    useEffect(() => {
        const candidatesCountToday = candidates.filter(candidate => 
            isToday(parseISO(candidate.candidateAddAt)));
        setCandidatesToday(candidatesCountToday.length);
    }, [candidates]);
    useEffect(() => {
        const candidatesCountWeek = candidates.filter(candidate => 
            isThisWeek(parseISO(candidate.candidateAddAt)));
        setCandidatesWeek(candidatesCountWeek.length);
    }, [candidates]);
    useEffect(() => {
        const candidatesCountMonth = candidates.filter(candidate => 
            isThisMonth(parseISO(candidate.candidateAddAt)));
        setCandidatesMonth(candidatesCountMonth.length);
    }, [candidates]);



    const data = {
        labels: top3Countries.map(c => c.country),
        datasets: [
            {
                label: 'Countries',
                data: top3Countries.map(c => c.count),
                backgroundColor: '#a9dfd8',
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Top 3 countries with candidates' },
        },
    };


    const data2 = {
        labels: ["Today", "On this week", "On this month"],
        datasets: [
            {
                label: "Historical Candidates aggregates",
                data: [candidatesToday, candidatesWeek, candidatesMonth],
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
        labels: [filterCountry],
        datasets: [
            {
                label: "Candidates to relocate",
                data: [relocationCount],
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

    const handleFilterCountry = (e: any) => {
        let country = e.target.value;
        setFilterCountry(country)
        relocationCountryCounts(filterCountry);
    }

    const relocationCountryCounts = (country: string) => {
        const countCandidatesOnCountry = candidates.filter(
            (candidate) => candidate.relocation === country
        ).length;

        setRelocationCount(countCandidatesOnCountry);
    };

    // function getTop3Countries(candidates: any) {
    //     return Object.entries(
    //         candidates.reduce((acc, cand) => {
    //             acc[cand.relocation] = (acc[cand.relocation] || 0) + 1;
    //             return acc;
    //         }, {} as Record<string, number>)
    //     )
    //     .sort((a, b) => b[1] - a[1])
    //     .slice(0, 3);
    //     .map(([country, count]) => ({ country, count }));
    // } 

    function getTop3Countries(candidates: any) {
        const counts = candidates.reduce((acc, cand) => {
            acc[cand.relocation] = (acc[cand.relocation] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([country, count]) => ({ country, count }));
    }


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
                            <select value={filterCountry} onChange={handleFilterCountry}>
                                <option value="0" disabled>Choose a option</option>
                                {COUNTRIES.map((c: any) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                            <div style={{ height: '15rem' }}>
                                <Doughnut data={data3} options={options3} />
                            </div>
                        </div>
                        <div className='box-section'>
                            <div style={{ height: '15rem' }}>
                                <Bar data={data} options={options} />
                            </div>
                        </div>
                        <div className='box-section'>
                            <div style={{ height: '15rem' }}>
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