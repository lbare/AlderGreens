import { Minus, Plus, Check, ArrowArcLeft } from "@phosphor-icons/react";

interface CircularButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: string;
}

const CircularButton = (props: CircularButtonProps) => {
  return (
    <div className="items-center justify-center w-16 h-16">
      <button
        className={`p-3 bg-white border-4 border-green-700 rounded-full`}
        onClick={props.onClick}
        style={{
          boxShadow: "4px 4px #2d603a",
        }}
      >
        {props.icon === "minus" ? (
          <Minus size={30} weight="bold" color="#2D603A" />
        ) : props.icon === "plus" ? (
          <Plus size={30} weight="bold" color="#2D603A" />
        ) : props.icon === "check" ? (
          <Check size={30} weight="bold" color="#2D603A" />
        ) : (
          <ArrowArcLeft size={30} weight="bold" color="#2D603A" />
        )}
      </button>
    </div>
  );
};

export default CircularButton;
