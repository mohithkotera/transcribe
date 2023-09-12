import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: null,
    usn: null,
    email: null,
    phoneno: null,
    branch: null,
    address: null,
  });
  const { id } = useParams();

  const getDetailsById = () => {
    const byid = {
      _id: id,
    };

    axios
      .post("http://localhost:4000/detailsByid", byid)
      .then((res) => {
        console.log("res.data", res.data);
        setDetails({
          name: res.data.name,
          usn: res.data.usn,
          email: res.data.email,
          phoneno: res.data.phoneno,
          branch: res.data.branch,
          address: res.data.address,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///////Update student register//////
  const Update = (e) => {
    e.preventDefault();

    const updateObj = {
      _id: id,
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
        .post("http://localhost:4000/updateByid", updateObj)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getDetailsById();
  }, []);

  return (
    <div className="flex  justify-center my-4">
      <div className="card-shadow px-4 py-6 w-[400px] ">
        <div className="text-center font-bold text-lg text-slate-500">
          Update Student Registration Details
        </div>
        <div className="flex flex-col py-2 gap-3">
          <label>Name</label>
          <input
            type="text"
            className="border border-blue-200 px-2 py-3 rounded-md "
            placeholder="Enter Name"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col py-2 gap-3">
          <label>USN No</label>
          <input
            type="text"
            className="border border-blue-200 px-2 py-3 rounded-md "
            placeholder="Enter USN"
            value={details.usn}
            onChange={(e) => setDetails({ ...details, usn: e.target.value })}
          />
        </div>
        <div className="flex flex-col py-2 gap-3">
          <label>Email</label>
          <input
            type="text"
            className="border border-blue-200 px-2 py-3 rounded-md "
            placeholder="Enter Email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col py-2 gap-3">
          <label>Phone No</label>
          <input
            type="text"
            className="border border-blue-200 px-2 py-3 rounded-md "
            placeholder="Enter Phone no"
            value={details.phoneno}
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
            value={details.branch}
            onChange={(e) => setDetails({ ...details, branch: e.target.value })}
          />
        </div>
        <div className="flex flex-col py-2 gap-3">
          <label>Address</label>
          <input
            type="text"
            className="border border-blue-200 px-2 py-3 rounded-md "
            placeholder="Enter Address"
            value={details.address}
            onChange={(e) =>
              setDetails({ ...details, address: e.target.value })
            }
          />
        </div>
        <div className="flex pt-4">
          <button
            onClick={(e) => Update(e)}
            className="bg-[#00ACEE] text-white w-full py-2 rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
