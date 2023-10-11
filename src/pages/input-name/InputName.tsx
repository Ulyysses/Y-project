import React, { ChangeEvent, useState, FocusEvent } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

interface IInputNameProps {
  value: {
    name: string;
  };
  changeValue: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder: string;
}

const InputName = ({ value, changeValue }: IInputNameProps) => {
  const [nameHasError, setNameHasError] = useState(false);

  const validateName = (name: string) => {
    const nameRegex = /^(.*[a-zA-Zа-яА-Я]){2}/;
    const nameValidity = nameRegex.test(name);
    setNameHasError(!nameValidity);
  };

  const onBlur = (event?: FocusEvent<HTMLInputElement, Element>): void => {
    if (event?.currentTarget === event?.target) {
      validateName(value.name);
    }
  };

  const changeValueError = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNameHasError(false);
    changeValue(event);
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

export default InputName;
