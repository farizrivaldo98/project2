import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Maintenance from "./pages/Maintenance";
import Pareto from "./pages/ParetoData";
import Instrument from "./pages/Instrument";
import CreateNew from "./pages/CreateNew";
import CreateEdit from "./pages/CreateEdit";
import AppPareto from "./pages/building";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CheckLogin } from "./features/part/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CheckMail from "./pages/CheckMail";

function App() {
  const dispatch = useDispatch();
  const userlocalStorage = localStorage.getItem("user_token");

  //KEEP LOGIN CHECKER
  const keepLogin = () => {
    if (userlocalStorage) {
      // Get User Login Action Reducer
      dispatch(CheckLogin(userlocalStorage));
    }
  };

  useEffect(() => {
    // getArrival()
    keepLogin();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Instrument" element={<Instrument />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/pareto" element={<Pareto />} />
        <Route path="/createnew" element={<CreateNew />} />
        <Route path="/createedite/:id" element={<CreateEdit />} />
        <Route path="/building" element={<AppPareto />} />
        <Route path="/mail" element={<CheckMail />} />
      </Routes>
    </div>
  );
}

export default App;
