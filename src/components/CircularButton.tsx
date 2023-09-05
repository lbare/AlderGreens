import {
  Minus,
  Plus,
  Check,
  ArrowArcLeft,
  ArrowRight,
  ArrowLeft,
  SkipForward,
  SkipBack,
} from "@phosphor-icons/react";

interface CircularButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: string;
  classNameDiv?: string;
  classNameButton?: string;
  iconSize?: number;
}

const CircularButton = (props: CircularButtonProps) => {
  return (
    <div
      className={`items-center justify-center w-16 h-16 ${props.classNameDiv}`}
    >
      <button
        className={`p-3 bg-white border-4 border-green-700 rounded-full ${props.classNameButton}`}
        onClick={props.onClick}
        style={{
          boxShadow: "4px 4px #2d603a",
        }}
      >
        {props.icon === "minus" ? (
          <Minus size={props.iconSize || 30} weight="bold" color="#2D603A" />
        ) : props.icon === "plus" ? (
          <Plus size={props.iconSize || 30} weight="bold" color="#2D603A" />
        ) : props.icon === "check" ? (
          <Check size={props.iconSize || 30} weight="bold" color="#2D603A" />
        ) : props.icon === "forward" ? (
          <ArrowRight
            size={props.iconSize || 30}
            weight="bold"
            color="#2D603A"
          />
        ) : props.icon === "undo" ? (
          <ArrowArcLeft
            size={props.iconSize || 30}
            weight="bold"
            color="#2D603A"
          />
        ) : props.icon === "back" ? (
          <ArrowLeft
            size={props.iconSize || 30}
            weight="bold"
            color="#2D603A"
          />
        ) : props.icon === "skip forward" ? (
          <SkipForward
            size={props.iconSize || 30}
            weight="fill"
            color="#2D603A"
          />
        ) : props.icon === "skip back" ? (
          <SkipBack size={props.iconSize || 30} weight="fill" color="#2D603A" />
        ) : (
          ""
        )}
      </button>
    </div>
  );
};

export default CircularButton;
