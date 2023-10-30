import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  loginDetails: null,
  token: null,
  isLoggedIn: false,
  userDetails: null,
  profileDetails: null,
};

const authSlice = createSlice({
  name: 'authvalues',
  initialState: initialState,
  reducers: {
    setLoginDetails(state, action) {
      console.log('stae', state.loginDetails);
      state.loginDetails = action.payload;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    setProfileDetails(state, action) {
      state.profileDetails = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setReset(state, action) {
      state = initialState;
    },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     console.log('login', state.loginDetails);
  //     return {
  //       ...state,
  //       ...action.payload.authvalues,
  //     };
  //   },
  // },
});

export const {
  setLoginDetails,
  setToken,
  setIsLoggedIn,
  setUserDetails,
  setProfileDetails,
  setReset,
} = authSlice.actions;
export const selectAuthState = state => state.authvalues;

export default authSlice.reducer;
