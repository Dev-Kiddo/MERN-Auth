import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ProtectedRoute from "./pages/ProtectedRoute";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <main className="font-display">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* <Route path="/sign-up" element={<SignUp />} /> */}
        <Route element={<ProtectedRoute currentUser={currentUser} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </main>
  );
}

export default App;
