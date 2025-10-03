import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store'
import { updateRelocation } from "../store/saveCandidatesSlice";
import { NavLink } from 'react-router-dom';
import SaveCandidateComponent from "../components/SaveCandidateComponent";
import AsideComponent from '../components/AsideComponent';
import COUNTRIES from '../constants/countries';


const CandidatesManager = () => {
    const dispatch = useDispatch();
    const candidates = useSelector((state: RootState) => state.saveCandidates.data);

    console.log("Candidatos actuales en Redux:", candidates);

    const handleChangeCountryRelocate = (uuidCandidate: any,  e: any) => {
        let countryRelocate = e.target.value;
        dispatch(updateRelocation({ uuidCandidate, relocation: countryRelocate }));
    }

    // const dispatch = useDispatch();

    if (!candidates) return <div>Cargando...</div>;

    return (
        <div className='grid grid-cols-12'>
            <aside className='col-span-1'>
                <AsideComponent></AsideComponent>
            </aside>
            <div className='col-span-11 py-4 px-10'>
                <div>
                    <h1 className="text-3xl mb-10 text-center">Manager Candidates</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {candidates.map((candidate: any) => (
                            <div className='box-section' key={candidate.login.uuid}>
                                <div className='mb-6'>
                                    <span>Relocate to:</span>
                                    <select
                                        value={candidate.relocation || "0"}
                                        onChange={(e) => handleChangeCountryRelocate(candidate.login.uuid, e)}
                                    >
                                        <option value="0">
                                            Choose an option
                                        </option>
                                        {COUNTRIES.map((c: any) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <SaveCandidateComponent candidate={candidate} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidatesManager;
