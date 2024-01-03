import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    currentUser: null,
    isLoading: false,
    isError: false,
    tasks: [],
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

        signInStart: (state) => {
            state.isLoading = true

        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.isError = false

        },
        signInFailure: (state) => {
            state.isError = true
            state.isLoading = false

        },
        signOut: (state) => {
            state.currentUser = null;
            state.isLoading = false;
            state.isError = false;

        },
        getUserTasks: (state , action) => {
            state.tasks = action.payload
        },
        profileDelete: (state) => {
            state.currentUser = null 
            state.isLoading = false
            state.isError = false
        }

    }
})


export const {profileDelete, getUserTasks, signOut, signInStart , signInSuccess , signInFailure} = userSlice.actions

export default userSlice.reducer;