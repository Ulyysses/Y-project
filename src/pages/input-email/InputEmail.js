import React from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const InputEmail = ({ value, changeValue, placeholder }) => {
  const [emailHasError, setEmailHasError] = React.useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidity = emailRegex.test(email);
    setEmailHasError(!emailValidity);
  };

  const onBlur = (e) => {
    if (e.currentTarget === e.target) {
      validateEmail(value.email);
    }
  };

  const changeValueError = (e) => {
    setEmailHasError(false);
    changeValue(e);
  };

  return (
    <Input
      value={value.email}
      type={"email"}
      placeholder={placeholder}
      onChange={changeValueError}
      name={"email"}
      error={emailHasError}
      errorText={"Невалидный email-адрес!"}
      size={"default"}
      extraClass="ml-1"
      required
      onBlur={onBlur}
    />
  );
};

InputEmail.propTypes = {
  value: PropTypes.object.isRequired,
  changeValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputEmail;
