import "./App.css";
import { useSelector } from "react-redux";
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
import { useEffect,useState } from "react";
import CheckMail from "./pages/CheckMail";
import EditProfile from "./pages/EditProfile";
import Production from "./pages/Production";
import App1 from "./pages/LandingProduction";
import AvabilityOPE from "./pages/AvabilityOPE";
import AvabilityMachine from "./pages/AvabilityMachine";
import Admin from "./pages/Admin";
import Sidebar from "./components/Sidebar";
import OEEline from "./pages/OEEline";
import Utility from "./pages/Utility";
import Stopwatch from "./pages/Stopwatch";

function App() {
  const dispatch = useDispatch();
  const userlocalStorage = localStorage.getItem("user_token");
  const userGlobal = useSelector((state) => state.user.user.level);
  const [levelData, setLevelData] = useState();

  //KEEP LOGIN CHECKER
  const keepLogin = () => {
    if (userlocalStorage) {
      dispatch(CheckLogin(userlocalStorage));
    }
  };


  useEffect(() => {
    // getArrival()
    setLevelData(userGlobal)
    console.log(levelData);
    keepLogin();
  }, [userGlobal]);


  if (levelData >1 ) {
    return (
      <div>
        <div>
          <div>
            <Navbar />
          </div>
          {/* <div>
            <Sidebar />
          </div> */}
        </div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/maintenance" element={<Maintenance />} />

          <Route path="/Instrument" element={<Instrument />} />
          
          <Route path="/pareto" element={<Pareto />} />
          <Route path="/createnew" element={<CreateNew />} />
          <Route path="/createedite/:id" element={<CreateEdit />} />
          <Route path="/building" element={<AppPareto />} />
          <Route path="/mail" element={<CheckMail />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/production" element={<Production />} />
          <Route path="/OPE" element={<App1 />} />
          <Route path="/avabilityope" element={<AvabilityOPE />} />
          <Route path="/avabilitmachine" element={<AvabilityMachine />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/oeeLine" element={<OEEline />} />
          <Route path="/Utility" element={<Utility />} />
          <Route path="/Stopwatch" element={<Stopwatch />} />      
        </Routes>
      </div>
    );
  } else if (levelData === 1 ) {
    return (
      <div>
        <div>
          <div>
            <Navbar />
          </div>
          {/* <div>
            <Sidebar />
          </div> */}
        </div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/maintenance" element={<Maintenance />} />

        </Routes>
      </div>
    );
  }
  
  else{
    return (

      <div>
        <div>
          <div>
            <Navbar />
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mail" element={<CheckMail />} />
          <Route path="/Stopwatch" element={<Stopwatch />} />      
        </Routes>
      </div>
    );
  }
}

export default App;
