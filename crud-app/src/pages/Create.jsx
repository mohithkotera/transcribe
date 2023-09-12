import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";

const Create = () => {
  const { isloggedin, setIsloggedin } = useContext(Authcontext);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: null,
    usn: null,
    email: null,
    phoneno: null,
    branch: null,
    address: null,
  });
  ///////student register//////
  const StudentReg = (e) => {
    e.preventDefault();
    const studentObj = {
      name: details.name,
      usn: details.usn,
      email: details.email,
      phoneno: details.phoneno,
      branch: details.branch,
      address: details.address,
    };
    if (
      !details.name ||
      !details.usn ||
      !details.email ||
      !details.address ||
      !details.branch
    ) {
      alert("Please fill all the fields");
    } else {
      axios
        .post("http://localhost:4000/studentreg", studentObj)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  ////////Protected function////////
  const GetUserDetails = async () => {
    await axios
      .get("http://localhost:4000/getdetails", { withCredentials: true })
      .then((res) => {
        console.log("res.data", res.data);
      })
      .catch((err) => {
        navigate("/login");
      });
  };

  useEffect(() => {
    GetUserDetails();
  }, []);

  return (
    <div className="flex  justify-center my-4">
      <div className="card-shadow px-4 py-6 w-[400px] ">
        <div className="text-center font-bold text-lg text-slate-500">
          Enter Student Registration Details
        </div>
        <div className="flex flex-col py-2 gap-3">
          <label>Name</label>
          <input
            type="text"
            className="border border-blue-200 px-2 py-3 rounded-md "
            placeholder="Enter Name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col py-2 gap-3">
          <label>USN No</label>
          <input
            type="text"
            className="border border-blue-200 px-2 py-3 rounded-md "
            placeholder="Enter USN"
            onChange={(e) => setDetails({ ...details, usn: e.target.value })}
          />
        </div>
        <div className="flex flex-col py-2 gap-3">
          <label>Email</label>
          <input
            type="text"
            className="border border-blue-200 px-2 py-3 rounded-md "
            placeholder="Enter Email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col py-2 gap-3">
          <label>Phone No</label>
          <input
            type="text"
            className="border border-blue-200 px-2 py-3 rounded-md "
            placeholder="Enter Phone no"
            onChange={(e) =>
              setDetails({ ...details, phoneno: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col py-2 gap-3">
          <label>Branch</label>
          <input
            type="text"
            className="border border-blue-200 px-2 py-3 rounded-md "
            placeholder="Enter Branch"
            onChange={(e) => setDetails({ ...details, branch: e.target.value })}
          />
        </div>
        <div className="flex flex-col py-2 gap-3">
          <label>Address</label>
          <input
            type="text"
            className="border border-blue-200 px-2 py-3 rounded-md "
            placeholder="Enter Address"
            onChange={(e) =>
              setDetails({ ...details, address: e.target.value })
            }
          />
        </div>
        <div className="flex pt-4">
          <button
            onClick={(e) => StudentReg(e)}
            className="bg-[#00ACEE] text-white w-full py-2 rounded-lg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
