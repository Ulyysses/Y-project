import React, { ChangeEvent, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

interface IInputEmailProps {
  value: {
    email: string;
  };
  changeValue: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder: string;
}

const InputEmail = ({ value, changeValue, placeholder }: IInputEmailProps) => {
  const [emailHasError, setEmailHasError] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidity = emailRegex.test(email);
    setEmailHasError(!emailValidity);
  };

  const onBlur = (
    event?: React.FocusEvent<HTMLInputElement, Element> | undefined
  ): void => {
    if (event?.currentTarget === event?.target) {
      validateEmail(value.email);
    }
  };

  const changeValueError = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmailHasError(false);
    changeValue(event);
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

export default InputEmail;
