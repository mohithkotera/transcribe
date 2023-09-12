import "./App.css";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Read from "./pages/Read";
import Update from "./pages/Update";
import AuthcontextProvider from "./context/Authcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Transcribe from "./pages/Transcribe";

function App() {
  return (
    <AuthcontextProvider>
      <div className="bg-[#00ACEE] py-4 px-8">
        <NavBar />
      </div>
      <main className="flex flex-row">
        <div className="flex basis-20 bg-[#71BAD6]">
          <Sidebar />
        </div>

        <ToastContainer autoClose={2000} />
        <section className=" w-full h-screen">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/read" element={<Read />}></Route>
            <Route path="/transcribe" element={<Transcribe />}></Route>
            <Route path="/update/:id" element={<Update />}></Route>
          </Routes>
        </section>
      </main>
    </AuthcontextProvider>
  );
}

export default App;
