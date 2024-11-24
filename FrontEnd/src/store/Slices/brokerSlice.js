import { createSlice } from "@reduxjs/toolkit";

const brokerSlice = createSlice({
    name: "broker",
    initialState: {
        broker: {
            id: 1,
            firstName: "Admin",
            lastName: "group",
            email: "admin@yopmail.com",
            phoneNo: "1234567890",
            countryId: 0,
            logoFilePath: " ",
            domainName: "localhost",
        }
    },
    reducers: {
        setBroker: (state, action) => {
            state.broker = action.payload
        }
    },
})

export const { setBroker } = brokerSlice.actions;

export default brokerSlice.reducer;