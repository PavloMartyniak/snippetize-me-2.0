import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import {
  authMe,
  getAllLanguages,
  selectIsUserAuth,
} from "./redux/slices/userSlice";
import Header from "./components/Header";

function App() {
  const isAuth = useSelector(selectIsUserAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    Boolean(localStorage.getItem("token")) && dispatch(authMe());
    Boolean(localStorage.getItem("token")) && dispatch(getAllLanguages());
  }, [dispatch]);

  return (
    <div>
      <Header isAuth={isAuth} />
      <div style={{ padding: "2%" }}>
        {isAuth ? <HomePage /> : <div>Please login to continue...</div>}
      </div>
    </div>
  );
}
export default App;
