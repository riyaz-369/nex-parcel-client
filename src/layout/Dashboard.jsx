import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <div>
        <Sidebar />
      </div>
      <div className="md:flex-1 md:ml-64">
        <div className="p-2 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
