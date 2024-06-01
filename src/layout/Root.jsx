import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const Root = () => {
  return (
    <div className="font-roboto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
