import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : []
}

export const pasteSlice = createSlice({
    name: 'pastes',
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;
            // add a check paste already exists
            state.pastes.push(paste);
            localStorage.setItem('pastes', JSON.stringify(state.pastes));
            toast.success("Paste added")
        },
        updateToPastes: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);
            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success("Paste updated")
            }
        },
        resetAllPastes: (state, action) => {
            state.pastes = [];
            localStorage.removeItem('pastes');
            toast.success("All pastes removed")

        },
        removeFromPastes: (state, action) => {
            const pasteId = action.payload;
            console.log(pasteId);
            const index = state.pastes.findIndex((item) => item._id === pasteId);
            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success("Paste removed")
            }

        },
    },
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer