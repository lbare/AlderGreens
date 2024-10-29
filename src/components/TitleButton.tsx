import { useNavigate } from "react-router-dom";
import IconSelector from "./IconSelector";

interface TitleButtonProps {
  title: string;
  iconType?: string;
  isClicked?: boolean;
  page?: string;
  onClick?: () => void;
  classNameText?: string;
  classNameButton?: string;
  classNameFont?: string;
  hidden?: boolean;
}

const TitleButton = ({
  title,
  iconType,
  isClicked = false,
  page,
  onClick,
  classNameText,
  classNameButton,
  classNameFont,
  hidden,
}: TitleButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (page) navigate(page);
  };

  return (
    <div
      className={`w-full items-center justify-center ${classNameText} ${hidden ? "opacity-0" : ""}`}
    >
      <button
        className={`flex items-center justify-center py-4 w-full bg-white border-4 border-green-700 rounded-xl ${classNameButton}`}
        style={{ boxShadow: "7px 7px #2d603a" }}
        onClick={handleClick}
      >
        {iconType && <IconSelector iconType={iconType} isClicked={isClicked} />}
        <h1
          className={`ml-2 text-3xl font-archivo font-black italic text-green-700 ${classNameFont}`}
        >
          {title}
        </h1>
      </button>
    </div>
  );
};

export default TitleButton;
