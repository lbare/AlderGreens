import { useNavigate } from "react-router-dom";

interface CustomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isTitle: boolean;
  page?: string;
}

const CustomButton = (props: CustomButtonProps) => {
  const navigate = useNavigate();

  const onClickLink = () => {
    if (props.page) navigate(props.page);
  };

  return (
    <div className="w-full items-center justify-center drop-shadow-lg blur-none">
      <button
        className={`py-4 w-full bg-white border-4 border-green-700 rounded-xl`}
        style={{
          boxShadow: "7px 7px #2d603a",
        }}
        onClick={props.page ? onClickLink : props.onClick}
      >
        <h1 className="text-3xl font-archivo font-black italic text-green-700">
          {props.title}
        </h1>
      </button>
    </div>
  );
};

export default CustomButton;
