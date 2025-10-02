import { createSlice } from "@reduxjs/toolkit";

interface CandidatesState {
    data: any[] | null;
}

const initialState: CandidatesState = {
    data: null,
};

const candidatesSlice = createSlice({
    name: "candidates",
    initialState,
    reducers: {
        setCandidates: (state, action) => {
            state.data = action.payload;
        },
        updateCandidate: (state, action: any) => {
            if (state.data) {
                const index = state.data.findIndex(
                    (c) => c.login.uuid === action.payload.login.uuid
                );
                console.log(index);
                if (index !== -1) {
                    state.data[index] = action.payload.newData;
                }
            }
        },
    },
});

export const { setCandidates, updateCandidate } = candidatesSlice.actions;
export default candidatesSlice.reducer;