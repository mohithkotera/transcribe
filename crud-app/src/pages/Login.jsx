import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import login from "../assets/images/login.png";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const userObj = {
      email,
      password,
    };
    if (!email || !password) {
      toast.warn("Please fill all the fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      axios
        .post("http://localhost:4000/signin", userObj)
        .then((res) => {
          toast.success("User signed in Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch((err) => {
          toast.error("Invalid Credientials", {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(err);
        });
    }
  };

  return (
    <div className="grid grid-cols-2 justify-center items-center ">
      <div className="col-span-1 flex justify-center items-center mt-10 px-5 py-5 ">
        <img src={login} />
      </div>
      <div className=" col-span-1 flex justify-center  ">
        <div className="card-shadow shadow-slate-200 w-[489px]  py-10 px-6 rounded-md">
          <div className="text-center text-[#121212]  font-bold text-[32px]">
            Login
          </div>
          <div className="text-[#424242] text-center font-bold py-2 text-base">
            Please login here!{" "}
          </div>
          <div className="flex flex-col gap-10">
            <input
              className="px-3 py-3 border border-blue-300 rounded-lg"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="px-3 py-3 border border-blue-300 rounded-lg"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={() => handleSubmit()}
              className="bg-[#00ACEE] text-white py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
