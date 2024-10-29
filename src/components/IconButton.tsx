import { useNavigate } from "react-router-dom";
import IconSelector from "./IconSelector";

interface IconButtonProps {
  iconType: string;
  isClicked: boolean;
  page?: string;
  onClick?: () => void;
  classNameText?: string;
  classNameButton?: string;
}

const IconButton = ({
  iconType,
  isClicked,
  page,
  onClick,
  classNameText,
  classNameButton,
}: IconButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (page) navigate(page);
  };

  return (
    <div className={`items-center justify-center p-4 ${classNameText}`}>
      <button
        className={`py-2 px-6 bg-white border-4 border-green-700 rounded-full ${classNameButton}`}
        style={{ boxShadow: "5px 5px #2d603a" }}
        onClick={handleClick}
      >
        <IconSelector iconType={iconType} isClicked={isClicked} />
      </button>
    </div>
  );
};

export default IconButton;
