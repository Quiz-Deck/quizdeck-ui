import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserData } from "../api/authSliceTypes";

const initialState: UserData = {
  id: "",
  createdOn: new Date(),
  email: "",
  userName: "",
  phoneNumber: "",
};

const authReducerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    logOut: () => {
      console.log('kkkk');
      window.location.replace("/");
      localStorage.clear();
    },
  },
});

export const userAuth = (state: RootState) => state.auth;

export const { setUser, logOut } = authReducerSlice.actions;

// Export the slice reducer as the default export
export default authReducerSlice.reducer;
