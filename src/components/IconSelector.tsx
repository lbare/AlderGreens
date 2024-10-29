import {
  Plus,
  PencilSimpleLine,
  PencilSimple,
  MapPin,
  MapPinLine,
  Users,
  User,
} from "@phosphor-icons/react";

interface IconSelectorProps {
  iconType: string;
  isClicked: boolean;
}

const IconSelector = ({ iconType, isClicked }: IconSelectorProps) => {
  switch (iconType) {
    case "scramble":
      return <Users size={36} color="#2d603a" weight="bold" />;
    case "individual":
      return <User size={36} color="#2d603a" weight="bold" />;
    case "plus":
      return <Plus size={28} color="#2d603a" weight="bold" />;
    case "scorecard":
      return isClicked ? (
        <PencilSimpleLine size={32} color="#2d603a" weight="fill" />
      ) : (
        <PencilSimple size={32} color="#2d603a" weight="bold" />
      );
    default:
      return isClicked ? (
        <MapPinLine size={32} color="#2d603a" weight="fill" />
      ) : (
        <MapPin size={32} color="#2d603a" weight="bold" />
      );
  }
};

export default IconSelector;
