import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux';
import { setCandidates } from "../store/candidatesSlice";
import CandidateComponent from "../components/CandidateComponent";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import AsideComponent from '../components/AsideComponent';


const Candidates = () => {
    const dispatch = useDispatch();
    const candidates = useSelector((state: RootState) => state.candidates.data);

    useEffect(() => {
        if (!candidates) {
            fetch("https://randomuser.me/api/?results=6")
            .then(res => {
                console.log("Status:", res.status);
                return res.json();
            })
            .then(data => {
                dispatch(setCandidates(data.results));
            })
            .catch(err => console.error("Error:", err));
        }
    }, [candidates, dispatch]);

    if (!candidates) return <div>Cargando...</div>;

    // console.log(candidates);

    return (
        <div className='grid grid-cols-12'>
            <aside className='col-span-12 xl:col-span-1'>
                <AsideComponent></AsideComponent>
            </aside>
            <div className='col-span-12 xl:col-span-11 py-4 px-10'>
                <div>
                    <h1 className="text-3xl mb-10 text-center">Candidates</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {candidates.map((candidate: any) => (
                            <div className='box-section'>
                                <CandidateComponent candidate={candidate} key={candidate.login.uuid} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Candidates;