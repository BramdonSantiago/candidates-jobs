import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import candidatesReducer from './candidatesSlice';
import saveCandidatesReducer from './saveCandidatesSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        candidates: candidatesReducer,
        saveCandidates: saveCandidatesReducer,
    },
});

// Tipos útiles para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;