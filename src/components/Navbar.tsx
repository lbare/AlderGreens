import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full flex justify-evenly">
      <Link to="/">Home</Link>
      <Link to="/scorecard">Score</Link>
    </div>
  );
};

export default Navbar;
