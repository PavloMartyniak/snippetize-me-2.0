import React from "react";
import axios from "../axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { Button } from "@mui/material";
import { BsGoogle } from "react-icons/bs";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse, "codeResponse");
      const tokens = await axios.post("/dj-rest-auth/google/", {
        code: codeResponse.code,
      });

      console.log(tokens, "tokens");
      const { access, user } = tokens.data;
      localStorage.setItem("token", access);
      dispatch(setUser(user));
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <Button
      sx={{ gap: 1 }}
      variant="contained"
      onClick={() => googleLogin()}
      color="primary"
    >
      <BsGoogle size={16} />
      Login
    </Button>
  );
};

export default GoogleLoginButton;
