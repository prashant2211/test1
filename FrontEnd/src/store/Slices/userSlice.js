import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        userDetails: {
            _id: "",
            firstName: "",
            lastName: "",
            fullName: "",
            email: "",
            roleName: "",
            ibRoleName: null,
            isVerified: false,
            isKyc: false,
            isAccount: false,
            isDeposit: false,
            profileImage: null,
            referralCode: ""
        },
    },
    reducers: {
        setloggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
    },
})

export const { setloggedIn, setUserDetails } = userSlice.actions;

export default userSlice.reducer;