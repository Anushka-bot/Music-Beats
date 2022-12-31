import Navbar2 from "./Navbar2";
import "../css/styles.css";

const Header = ({ mood }) => {
  return (
    <>
      <Navbar2 />
      <div className="text text-grad haudiofeel">{mood}</div>;
    </>
  );
};

export default Header;
