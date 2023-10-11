import React, { ChangeEvent, useState, useRef, FocusEvent } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

interface IInputPasswordProps {
  value: {
    password: string;
  };
  changeValue: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder: string;
}

const InputPassword = ({
  value,
  changeValue,
  placeholder,
}: IInputPasswordProps) => {
  const [iconPassword, setIconPassword] = useState<"HideIcon" | "ShowIcon">(
    "HideIcon"
  );
  const [typePassword, setTypePassword] = useState<"password" | "text">(
    "password"
  );
  const [passwordHasError, setPasswordHasError] = useState(false);

  const inputPasswordRef = useRef<HTMLInputElement | null>(null);
  const toggleShowPassword = () => {
    setTimeout(() => inputPasswordRef.current?.focus(), 0);
    if (iconPassword === "HideIcon") {
      setIconPassword("ShowIcon");
      setTypePassword("text");
    } else {
      setIconPassword("HideIcon");
      setTypePassword("password");
    }
  };

  const validateName = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Zа-яА-Я])[^\s]{3,}$/;
    const passwordValidity = passwordRegex.test(password);
    setPasswordHasError(!passwordValidity);
  };

  const onBlur = (event?: FocusEvent<HTMLInputElement, Element>): void => {
    if (event?.currentTarget === event?.target) {
      validateName(value.password);
    }
  };

  const changeValueError = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPasswordHasError(false);
    changeValue(event);
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

export default InputPassword;
