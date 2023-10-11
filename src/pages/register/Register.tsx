import { useNavigate, Navigate } from "react-router-dom";
import React, { ChangeEvent, FormEvent, useState } from "react";
import classNames from "classnames";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import InputPassword from "../input-password/InputPassword";
import InputName from "../input-name/InputName";
import InputEmail from "../input-email/InputEmail";
import { useAuth } from "../auth";
import Loading from "../../components/loading/Loading";
import { register } from "../../utils/api";

import css from "../index.module.scss";

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [hasError, setHasError] = useState();

  const changeValue = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue(() => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };

  const post = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register(value)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (!response.success) {
          setHasError(response.message);
        }

        if (response.success) {
          navigate("/login");
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <Loading style={{ height: "70vh" }} />;
  }

  return (
    <section className={css.form}>
      <form className={css.form_container} onSubmit={post}>
        <h1 className="text text_type_main-large">Регистрация</h1>
        <InputName
          changeValue={changeValue}
          value={value}
          placeholder={"Имя"}
        />
        <InputEmail
          changeValue={changeValue}
          value={value}
          placeholder={"E-mail"}
        />
        <InputPassword
          changeValue={changeValue}
          value={value}
          placeholder={"Пароль"}
        />
        {hasError && (
          <p
            className={classNames(
              "text text_type_main-default",
              css.error_message
            )}
          >
            {hasError}
          </p>
        )}
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={css.form_text}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <a
            className={classNames("text text_type_main-default", css.form_link)}
            href="/login"
          >
            Войти
          </a>
        </p>
      </div>
    </section>
  );
};

export default Register;
