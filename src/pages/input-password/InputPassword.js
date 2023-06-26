import React from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const InputPassword = ({ value, changeValue, placeholder }) => {
  const [iconPassword, setIconPassword] = React.useState("HideIcon");
  const [typePassword, setTypePassword] = React.useState("password");
  const [passwordHasError, setPasswordHasError] = React.useState(false);

  const inputPasswordRef = React.useRef(null);
  const toggleShowPassword = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0);
    if (iconPassword === "HideIcon") {
      setIconPassword("ShowIcon");
      setTypePassword("text");
    } else {
      setIconPassword("HideIcon");
      setTypePassword("password");
    }
  };

  const validateName = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Zа-яА-Я])[^\s]{3,}$/;
    const passwordValidity = passwordRegex.test(password);
    setPasswordHasError(!passwordValidity);
  };

  const onBlur = (e) => {
    if (e.currentTarget === e.target) {
      validateName(value.password);
    }
  };

  const changeValueError = (e) => {
    setPasswordHasError(false);
    changeValue(e);
  };

  return (
    <Input
      id="password"
      ref={inputPasswordRef}
      onIconClick={toggleShowPassword}
      value={value.password}
      type={typePassword}
      placeholder={placeholder}
      onChange={changeValueError}
      icon={iconPassword}
      name={"password"}
      error={passwordHasError}
      errorText={"Невалидный пароль!"}
      onBlur={onBlur}
      required
    />
  );
};

InputPassword.propTypes = {
  value: PropTypes.object.isRequired,
  changeValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputPassword;
