import css from "./index.module.scss";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

const Error = ({ style }) => {
  return (
    <div className={css.error_container} style={style}>
      <Logo />
      <p className="text text_type_main-large">Что-то пошло не так...</p>
    </div>
  );
};

export default Error;
