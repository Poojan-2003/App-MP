import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import HomePage from "./pages/HomePage";
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";
import Profile from "./pages/Profile/profile";
import Admin from "./pages/Admin/admin";
import Fridge from "./pages/Home/Fridge";
import Juice from "./pages/Home/Juice";
import MyComp from "./pages/Home/MyComp";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<ProtectedPage></ProtectedPage>} /> */}
          
          {<Route path="/" element={<Register />} />}
          {<Route path="/home" element={<Home />} />}
          {<Route path="/profile" element={<Profile />} />}
          {<Route path="/protectedpage" element={<ProtectedPage />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Fridge" element={<Fridge />} />
          <Route path="/juice" element={<Juice />} />
          <Route path="/Mycomp" element={<MyComp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
