import { createSlice } from "@reduxjs/toolkit";

interface saveCandidatesState {
    data: any[] | null;
}

const initialState: saveCandidatesState = {
    data: [],
};

const saveCandidatesSlice = createSlice({
    name: "saveCandidates",
    initialState,
    reducers: {
        saveCandidates: (state, action) => {
            if (state.data) {
                state.data.push(action.payload);
            }
        },
        updateRelocation: (state, action) => {
            if (state.data) {
                const index = state.data.findIndex(
                    (c) => c.login.uuid === action.payload.uuidCandidate
                );
                console.log(index);
                if (index !== -1) {
                    state.data[index].relocation = action.payload.relocation;
                }
            }
        },
    },
});

export const { saveCandidates, updateRelocation } = saveCandidatesSlice.actions;
export default saveCandidatesSlice.reducer;