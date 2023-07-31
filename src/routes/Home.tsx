import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex h-1/4 flex-col justify-between items-center">
        <Link
          to="/players"
          className="text-4xl font-bold underline text-white hover:text-green-300 font-archivo"
        >
          New Game
        </Link>
        <Link
          to="/"
          className="text-4xl font-bold underline text-white hover:text-green-300 font-archivo"
        >
          History
        </Link>
      </div>
    </div>
  );
};

export default Home;
