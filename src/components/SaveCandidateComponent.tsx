import { useState, useEffect } from "react";
// import type { RootState } from '../store'
// import { useSelector, useDispatch } from 'react-redux';
// import { updateCandidate } from "../store/candidatesSlice";
// import { saveCandidates } from "../store/saveCandidatesSlice";




const SaveCandidateComponent = ({candidate}:any) => {
    // const dispatch = useDispatch();

    const [candidateData, setCandidateData] = useState(candidate);
    const [relocation, setRelocation] = useState(candidate.relocation);

    useEffect(() => {
        setRelocation(candidate.relocation);
    }, [candidate.relocation]);

    const handleDeleteCandidate = () => {
        alert("Eliminar");
    }

    // console.log(candidate);

    return (
        <div className="candidate-card-component rounded-2xl overflow-hidden">
            <div className="candidate-img">
                <img
                    src={candidateData.picture.large}
                    alt=""
                    className="w-full"
                    style={{ height: "18rem", objectFit: "cover", objectPosition: "top" }}
                />
                <div className="icon-trash">
                    <i className="fa-solid fa-trash"></i>
                    <span onClick={handleDeleteCandidate} className="trash-text">Delete</span>
                </div>
            </div>
            <div className="p-4">
                <span className="candidate-text block mb-4">Candidate</span>
                <h3 className="text-lg font-semibold mb-3">
                    {candidateData.name?.first} {candidate.name?.last}
                </h3>
                <p style={{ color: "gray" }}>Location: {candidateData.location?.country}</p>
                <p style={{ color: "gray" }}>Email: {candidateData.email}</p>
                <p style={{ color: "gray" }}>Phone: {candidateData.phone}</p>
                <p className="mt-4">Relocation <i className="fa-solid fa-arrow-right candidate-text"></i> {relocation}</p>
            </div>
        </div>
    );
};

export default SaveCandidateComponent;