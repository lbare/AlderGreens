import { useNavigate } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

interface CustomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isTitle: boolean;
  page?: string;
  isClicked?: boolean;
  classNameText?: string;
  classNameFont?: string;
  hidden?: boolean;
  icon?: string;
}

const CustomButton = (props: CustomButtonProps) => {
  const navigate = useNavigate();

  const onClickLink = () => {
    if (props.page) navigate(props.page);
  };

  if (props.isTitle) {
    return (
      <div
        className={`w-full items-center justify-center ${props.classNameText} ${
          props.hidden && "opacity-0"
        }`}
      >
        <button
          className={`py-4 w-full bg-white border-4 border-green-700 rounded-xl`}
          style={{
            boxShadow: "7px 7px #2d603a",
            WebkitTapHighlightColor: `${props.hidden && "transparent"}`,
          }}
          onClick={props.page ? onClickLink : props.onClick}
        >
          <h1
            className={`text-3xl font-archivo font-black italic text-green-700 ${props.classNameFont}`}
          >
            {props.title}
          </h1>
        </button>
      </div>
    );
  } else if (props.icon) {
    return (
      <div className={`items-center justify-center p-4 ${props.classNameText}`}>
        {props.isClicked ? (
          <button
            className={`py-2 px-6 bg-green-700 border-4 border-green-700 rounded-full`}
            onClick={props.page ? onClickLink : props.onClick}
          >
            <h1
              className={`text-2xl font-archivo font-bold text-white ${props.classNameFont}`}
            >
              {props.title}
            </h1>
          </button>
        ) : (
          <button
            className={`py-2 px-6 bg-white border-4 border-green-700 rounded-full ${props.classNameText}`}
            style={{
              boxShadow: "5px 5px #2d603a",
            }}
            onClick={props.page ? onClickLink : props.onClick}
          >
            <Plus size={28} color="#2d603a" weight="bold" />
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div
        className={`items-center justify-center p-2 px-4 ${props.classNameText}`}
      >
        {props.isClicked ? (
          <button
            className={`py-2 px-6 bg-green-700 border-4 border-green-700 rounded-full`}
            onClick={props.page ? onClickLink : props.onClick}
          >
            <h1
              className={`text-2xl font-archivo font-bold text-white ${props.classNameFont}`}
            >
              {props.title}
            </h1>
          </button>
        ) : (
          <button
            className={`py-2 px-6 bg-white border-4 border-green-700 rounded-full ${props.classNameText}`}
            style={{
              boxShadow: "5px 5px #2d603a",
            }}
            onClick={props.page ? onClickLink : props.onClick}
          >
            <h1
              className={`text-2xl font-archivo font-bold text-green-700 ${props.classNameFont}`}
            >
              {props.title}
            </h1>
          </button>
        )}
      </div>
    );
  }
};

export default CustomButton;
