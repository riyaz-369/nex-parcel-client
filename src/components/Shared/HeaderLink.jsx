import { Link } from "react-router-dom";

import logo from "../../assets/icons/logo.png";

const HeaderLink = () => {
  return (
    <div>
      <Link
        to="/"
        className="text-xl md:text-3xl font-bold flex items-center gap-2"
      >
        <img className="md:block" src={logo} width="42" />
        <h1>
          Nex<span className="text-[#F43F5E]">Parcel</span>
        </h1>
      </Link>
    </div>
  );
};

export default HeaderLink;
