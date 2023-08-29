import CustomButton from "../components/CustomButton";
import HomeBG from "../assets/HomeBG.png";

const Home = () => {
  return (
    <div
      className="flex flex-col h-full w-full justify-center items-center"
      style={{
        backgroundImage: `url(${HomeBG})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex w-3/4 h-1/4 flex-col justify-between items-center">
        <CustomButton title="New Game" isTitle={true} page="tracking" />
        <CustomButton title="Scores" isTitle={true} page="" />
      </div>
    </div>
  );
};

export default Home;
