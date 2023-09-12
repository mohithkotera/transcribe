import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";

const NavBar = () => {
  const { isloggedin, setIsloggedin } = useContext(Authcontext);

  const clearToken = () => {
    axios
      .post("http://localhost:4000/logout")
      .then((res) => {
        console.log("res.data", res.data);
        setIsloggedin(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav className="flex justify-end gap-7">
      <Link className="text-white" to="/">
        Transcribe
      </Link>

      <Link className="text-white" to="/register">
        Register
      </Link>

      {isloggedin ? (
        <Link className="text-white" onClick={() => clearToken()} to="/login">
          Logout
        </Link>
      ) : (
        <Link className="text-white" to="/login">
          Login
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
