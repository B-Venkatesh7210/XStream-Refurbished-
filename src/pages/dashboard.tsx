import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import EditProfile from "@/components/EditProfile";
import UserProfile from "@/components/UserProfile";

const Dashboard = () => {
  const [enterEdit, setEnterEdit] = useState(false);

  return (
    <div className="bg flex flex-col justify-start items-center scrollbar-hidden content">
      <Navbar isSticky={false}></Navbar>
      <div className="h-[80vh] m-4 w-[90%] bg-secondaryGrey bg-opacity-20 rounded-2xl flex flex-col justify-start items-center">
        {enterEdit ? (
          <EditProfile></EditProfile>
        ) : (
          <UserProfile
            enterEdit={enterEdit}
            setEnterEdit={setEnterEdit}
          ></UserProfile>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
