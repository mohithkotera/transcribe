import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";
import ExcelJs from "exceljs";
import fs from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Read = () => {
  const { isloggedin } = useContext(Authcontext);
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);

  ////////read//////////

  const ReadDetails = () => {
    axios
      .get("http://localhost:4000/studentdetails")
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //////delete data//////////

  const deleteDetails = (_id) => {
    const delObj = {
      _id: _id,
    };
    console.log(delObj);
    axios
      .post("http://localhost:4000/delete", delObj)
      .then((res) => {
        console.log("res.data", res.data);
        ReadDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /////////edit data///////////
  const editDetails = (id) => {
    navigate(`/update/${id}`);
  };
  /////////body for pdf///////////////
  const info = [];
  details.forEach((item, index, array) => {
    info.push([
      item._id,
      item.name,
      item.usn,
      item.email,
      item.phoneno,
      item.branch,
      item.address,
    ]);
  });

  //////////////JSPDF///////////
  function ConvertPdf() {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["_id", "Name", "usn", "Email", "Phone No", "Branch", "Address"]],
      body: info,
      headStyles: { fillColor: "#00ACEE", halign: "center" },
      bodyStyles: { halign: "center" },
    });
    doc.save("Details.pdf");
  }
  ////////////Exceljs//////////////
  function Excel() {
    const wb = new ExcelJs.Workbook();
    const worksheet = wb.addWorksheet("My Sheet");

    worksheet.columns = [
      { header: "Id", key: "id", outlineLevel: 1 },
      { header: "Name.", key: "Name", outlineLevel: 1 },
      { header: "USN.", key: "USN", width: 10, outlineLevel: 1 },
      { header: "Email.", key: "Email", width: 10, outlineLevel: 1 },
      { header: "Phone No.", key: "Phone No", width: 10, outlineLevel: 1 },
      { header: "Branch.", key: "Branch", width: 10, outlineLevel: 1 },
      {
        header: "Address",
        key: "Address",
        width: 10,
        outlineLevel: 1,
      },
    ];

    worksheet.addRows(info);
    wb.xlsx
      .writeBuffer()
      .then((data) => {
        var blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        });
        fs.saveAs(blob, "My Sheet.xlsx");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  //////////Protected////////////
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
    ReadDetails();
  }, []);

  return (
    <div className="px-4 py-6">
      <div className="flex justify-end items-center gap-3 py-4">
        <div className="text-lg text-[#2d6a4f]">
          Download File here <span>{"->"}</span>
        </div>
        <div>
          <button
            onClick={() => Excel()}
            className="bg-[#2dc653] text-white px-3 py-1 rounded-md"
          >
            EXCEL
          </button>
        </div>

        <div>
          <button
            onClick={() => ConvertPdf()}
            className="bg-[#bc4749] text-white px-3 py-1 rounded-md"
          >
            PDF
          </button>
        </div>
      </div>
      <table className="w-full border-2 border-blue-200">
        <thead>
          <tr>
            <th className="py-3 border-2 border-blue-200">Name</th>
            <th className="py-3 border-2 border-blue-200">USN</th>
            <th className="py-3 border-2 border-blue-200">Email</th>
            <th className="py-3 border-2 border-blue-200">Phone No</th>
            <th className="py-3 border-2 border-blue-200">Branch</th>
            <th className="py-3 border-2 border-blue-200">Address</th>
            <th className="py-3 border-2 border-blue-200">Edit details</th>
            <th className="py-3 border-2 border-blue-200">Delete details</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item) => {
            return (
              <tr key={item._id} className="">
                <td className="border-2 border-blue-200 py-2 px-2 text-center">
                  {item?.name}
                </td>
                <td className="border-2 border-blue-200 py-2 px-2 text-center">
                  {item?.usn}
                </td>
                <td className="border-2 border-blue-200 py-2 px-2 text-center">
                  {item?.email}
                </td>
                <td className="border-2 border-blue-200 py-2 px-2 text-center">
                  {item?.phoneno}
                </td>
                <td className="border-2 border-blue-200 py-2 px-2 text-center">
                  {item?.branch}
                </td>
                <td className="border-2 border-blue-200 py-2 px-2 text-center">
                  {item?.address}
                </td>
                <td className="border-2 border-blue-200 py-2 px-2 text-center">
                  <button
                    onClick={() => editDetails(item._id)}
                    className="bg-[#00ACEE] text-white px-4 py-1 rounded-md"
                  >
                    Edit
                  </button>
                </td>
                <td className="border-2 border-blue-200 py-2 px-2 text-center">
                  <button
                    onClick={() => deleteDetails(item._id)}
                    className="bg-[#00ACEE] text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
