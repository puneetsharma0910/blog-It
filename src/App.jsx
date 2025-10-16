import { useState, useEffect } from "react";
import "./App.css";
import { login, logout } from "./store/authSlice";
import { authService } from "./appwrite/auth";
import { useDispatch } from "react-redux";

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from "react-router"
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("Error fetching user:", error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
         <Header/>
        <Outlet/>
         <Footer/>
    </>
  );
}

export default App;
