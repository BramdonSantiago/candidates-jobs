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
    },
});

export const { saveCandidates } = saveCandidatesSlice.actions;
export default saveCandidatesSlice.reducer;