import { TitleSelf } from "./styled";

const Title: React.FC<{ text: string }> = ({ text }) => {
  return <TitleSelf>{text}</TitleSelf>;
};

export default Title;
