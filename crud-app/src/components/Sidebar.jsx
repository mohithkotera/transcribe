import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";

const Sidebar = () => {
  const { isloggedin } = useContext(Authcontext);

  return (
    <div className="flex flex-col gap-7 py-4 px-2 ">
      <Link className="text-left text-white  font-semibold" to="/create">
        Create
      </Link>
      <Link className="text-left text-white  font-semibold" to="/read">
        Read
      </Link>
    </div>
  );
};

export default Sidebar;
