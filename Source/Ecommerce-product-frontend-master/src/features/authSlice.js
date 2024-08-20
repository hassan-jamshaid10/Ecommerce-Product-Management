import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  users: [
    {id: 1, username: 'user', password: 'user'}
  ],
  loggedInUser: null,  // This will hold the current logged-in user info
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        user => user.username === username && user.password === password
      );
      if (user) {
        state.loggedInUser = user;  // Set the logged-in user
      } else {
        state.loggedInUser = null;
      }
      // console.log(state.loggedInUser); //extra check to see if code works
    },

    logout: (state) => {
      state.loggedInUser = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
