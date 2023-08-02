import { useEffect } from "react";
import CustomButton from "../components/CustomButton";
import HomeBG from "../assets/HomeBG.png";

const disableScrolling = (event: TouchEvent) => {
  event.preventDefault();
};

const Home = () => {
  useEffect(() => {
    document.addEventListener("touchmove", disableScrolling, {
      passive: false,
    });
  }, []);

  return (
    <div
      className="flex w-full h-screen justify-center items-center"
      style={{
        backgroundImage: `url(${HomeBG})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex w-3/4 h-1/4 flex-col justify-between items-center">
        <CustomButton title="New Game" isTitle={true} page="players" />
        <CustomButton title="Scores" isTitle={true} page="" />
      </div>
    </div>
  );
};

export default Home;
