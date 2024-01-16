import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  user: null,
  languages: null,
};

export const authMe = createAsyncThunk("auth/me", async () => {
  const response = await axios.get("/dj-rest-auth/user/");
  return response.data;
});

export const logout = createAsyncThunk("logout/me", async () => {
  const response = await axios.post("/dj-rest-auth/logout/");
  return response.data;
});

export const getAllLanguages = createAsyncThunk("languages/all", async () => {
  const response = await axios.get("/prompt/options/");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      localStorage.removeItem("token");
    });
    builder.addCase(getAllLanguages.fulfilled, (state, action) => {
      state.languages = action.payload;
    });
  },
});

export const { setUser, setToken } = userSlice.actions;
export const selectIsUserAuth = (state) => Boolean(state.auth.user);
export default userSlice.reducer;
