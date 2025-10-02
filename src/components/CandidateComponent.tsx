import { useState } from "react";
import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux';
import { updateCandidate } from "../store/candidatesSlice";
import { saveCandidates } from "../store/saveCandidatesSlice";


const CandidateComponent = ({candidate}:any) => {
    const dispatch = useDispatch();

    const [candidateData, setCandidateData] = useState(candidate);

    // console.log(candidateData);

    const handleClickNextCandidate = async (buttonName: string) => {
        try {
            const res = await fetch("https://randomuser.me/api/?results=1");
            const data = await res.json();
            const newCandidate = data.results[0];
            const addCandidateWithRelocation = {...newCandidate, relocation: "Unassigned"};

            setCandidateData(addCandidateWithRelocation);
            dispatch(updateCandidate({ login: candidateData.login, newData: addCandidateWithRelocation }));
            if (buttonName === 'btn-save') {
                dispatch(saveCandidates({...candidateData, relocation: "Unassigned"}));
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    // console.log(candidate);

    return (
        <div className="candidate-card-component rounded-2xl overflow-hidden">
            <div>
                <img
                    src={candidateData.picture.large}
                    alt=""
                    className="w-full"
                    style={{ height: "18rem", objectFit: "cover", objectPosition: "top" }}
                />
            </div>
            <div className="p-4">
                <span className="candidate-text block mb-4">Candidate</span>
                <h3 className="text-lg font-semibold mb-3">
                    {candidateData.name?.first} {candidate.name?.last}
                </h3>
                <p style={{ color: "gray" }}>Location: {candidateData.location?.country}</p>
                <p style={{ color: "gray" }}>Email: {candidateData.email}</p>
                <p style={{ color: "gray" }}>Phone: {candidateData.phone}</p>

                <div className="flex justify-between align-center flex-col mt-6 gap-4">
                    <button
                        onClick={() => handleClickNextCandidate("btn-reject")}
                        className="inline-flex justify-center items-center px-3 py-1.5"
                    >
                        Reject candidate
                    </button>
                    <button
                        onClick={() => handleClickNextCandidate("btn-save")}
                        className="inline-flex justify-center items-center px-3 py-1.5 btn-save"
                    >
                        Save candidate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CandidateComponent;