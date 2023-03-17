import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: '',
        password: '',
        isLoggedIn: false,
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.email = '';
            state.password = '';
            state.isLoggedIn = false;
            state.user = null;
        },
        loggedInUser: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
        }
    },
});

export const { login, logout, loggedInUser } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
