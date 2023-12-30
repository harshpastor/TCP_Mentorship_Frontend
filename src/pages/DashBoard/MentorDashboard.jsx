import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import SideBar from "../../components/DashBoardComponents/SideBar";
import AddProblem from "../../components/DashBoardComponents/AddProblem";
import LeaderBoard from "../../components/LeaderBoard/TeamLeaderBoard";
import MentorDefaultDash from "../../components/DashBoardComponents/MentorDefaultDash";
import MenteeLeaderBoard from "../../components/LeaderBoard/MenteeLeaderBoard";

const MentorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Dashboard"); 
  const options =["Profile", "Dashboard" , "Team LeaderBoard" , "LeaderBoard" , "Assign Problem"]
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const renderMainContent = () => {
    switch (selectedOption) {
      case "Dashboard" : 
      return <MentorDefaultDash/>
      case "LeaderBoard":
        return <MenteeLeaderBoard />;
      case "Assign Problem":
        return <AddProblem />;
      case "Team LeaderBoard":
        return <LeaderBoard />;
      default:
        return null;
    }
  };
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false); // Update state to hide sidebar for smaller screens
      } else {
        setIsSidebarOpen(true); // Show sidebar for larger screens
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex flex-col space-x-3 md:flex-row">
        {isSidebarOpen && (
            <div>
              <SideBar 
                options={options}
                toggleSidebar={toggleSidebar} 
                setSelectedOption={setSelectedOption} 
              />
            </div>
        )}

        {/* Second part */}
        <div className={`${!isSidebarOpen ? "pl-4" : ""} flex flex-col space-y-2`}>
          {/* Kinda Navbar */}
        <div className="flex items-center mt-4">
            {!isSidebarOpen && (
              <FaBars className="text-2xl cursor-pointer text-black" onClick={toggleSidebar} />
            )}
        </div>
    {/* ############################################# Main Dash  #############################################*/}
          <div className={`${!isSidebarOpen && "md:space-x-10 p-7 w-screen"} flex flex-col md:flex-row justify-between`}>
          <div className="flex flex-col">
          <div>
              <p className="text-2xl text-black font-semibold pb-2">Hello Mentor1 👋</p>
              <p className="text-gray-500">Ready to guide the energetic mentees in their coding and development journey?!</p>
          </div>
    {/*###################### Rendering content based on selections ######################### */}
        <div>
          {renderMainContent()}
        </div>
      </div>
     </div>
    </div> 
  </div>
    </>
  );
};

export default MentorDashboard;