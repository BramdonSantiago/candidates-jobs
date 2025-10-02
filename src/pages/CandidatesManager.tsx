import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store'
import { NavLink } from 'react-router-dom';
import SaveCandidateComponent from "../components/SaveCandidateComponent";
import AsideComponent from '../components/AsideComponent';
import COUNTRIES from '../constants/countries';


const CandidatesManager = () => {
    const saveCandidates = useSelector((state: RootState) => state.saveCandidates.data);

    console.log("Candidatos actuales en Redux:", saveCandidates);

    const handleChangeCountryRelocate = (e: any) => {
        let countryRelocate = e.target.value;
        alert(countryRelocate);
    }

    // const dispatch = useDispatch();

    if (!saveCandidates) return <div>Cargando...</div>;

    return (
        <div className='grid grid-cols-12'>
            <aside className='col-span-1'>
                <AsideComponent></AsideComponent>
            </aside>
            <div className='col-span-11 py-4 px-10'>
                <div>
                    <h1 className="text-3xl mb-10 text-center">Manager Candidates</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {saveCandidates.map((candidate: any) => (
                            <div className='box-section'>
                                <div className='mb-6'>
                                    <span>Relocate to:</span>
                                    <select onChange={handleChangeCountryRelocate}>
                                        {candidate.relocation === '' ? (
                                            <>
                                                <option value="0" disabled selected>
                                                    Choose an option
                                                </option>
                                                {COUNTRIES.map((c: any) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </>
                                        ) : (
                                            <option value="0">JOJO</option>
                                        )}
                                    </select>
                                </div>
                                <SaveCandidateComponent candidate={candidate} key={candidate.login.uuid} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidatesManager;
