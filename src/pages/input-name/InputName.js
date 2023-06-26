import React from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const InputName = ({ value, changeValue }) => {
  const [nameHasError, setNameHasError] = React.useState(false);

  const validateName = (name) => {
    const nameRegex = /^(.*[a-zA-Zа-яА-Я]){2}/;
    const nameValidity = nameRegex.test(name);
    setNameHasError(!nameValidity);
  };

  const onBlur = (e) => {
    if (e.currentTarget === e.target) {
      validateName(value.name);
    }
  };

  const changeValueError = (e) => {
    setNameHasError(false);
    changeValue(e);
  };

  return (
    <Input
      value={value.name}
      type={"text"}
      placeholder={"Имя"}
      onChange={changeValueError}
      name={"name"}
      error={nameHasError}
      errorText={"Придумай другое имя!"}
      size={"default"}
      extraClass="ml-1"
      onBlur={onBlur}
      required
    />
  );
};

InputName.propTypes = {
  value: PropTypes.object.isRequired,
  changeValue: PropTypes.func.isRequired,
};

export default InputName;
