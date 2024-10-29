import TitleButton from "./TitleButton";
import IconButton from "./IconButton";

interface CustomButtonProps {
  isTitle: boolean;
  title?: string;
  page?: string;
  isClicked?: boolean;
  classNameText?: string;
  classNameButton?: string;
  classNameFont?: string;
  hidden?: boolean;
  icon?: string;
  onClick?: () => void;
}

const CustomButton = (props: CustomButtonProps) => {
  if (props.isTitle) {
    return (
      <TitleButton
        title={props.title || ""}
        iconType={props.icon}
        isClicked={!!props.isClicked}
        page={props.page}
        onClick={props.onClick}
        classNameText={props.classNameText}
        classNameButton={props.classNameButton}
        classNameFont={props.classNameFont}
        hidden={props.hidden}
      />
    );
  } else if (props.icon) {
    return (
      <IconButton
        iconType={props.icon}
        isClicked={!!props.isClicked}
        page={props.page}
        onClick={props.onClick}
        classNameText={props.classNameText}
        classNameButton={props.classNameButton}
      />
    );
  } else {
    return null;
  }
};

export default CustomButton;
