import { Navigate, useSearchParams } from "react-router-dom";
import React, { ChangeEvent, FormEvent, useState } from "react";
import classNames from "classnames";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import InputEmail from "../input-email/InputEmail";
import InputPassword from "../input-password/InputPassword";
import Loading from "../../components/loading/Loading";

import css from "../index.module.scss";
import { useAuth } from "../auth";

const Login = () => {
  const { isAuthenticated, signIn, isLoading, hasError } = useAuth();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  let [searchParams] = useSearchParams();
  const redirectURL = searchParams.get("redirect");

  const changeValue = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue(() => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };

  const post = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = value;
    signIn({ email, password });
  };

  if (isAuthenticated) {
    return redirectURL ? (
      <Navigate to={redirectURL} replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  if (isLoading) {
    return <Loading style={{ height: "70vh" }} />;
  }

  return (
    <section className={css.form}>
      <form className={css.form_container} onSubmit={post}>
        <h1 className="text text_type_main-large">Вход</h1>
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
          Войти
        </Button>
      </form>
      <div className={css.form_text}>
        <p className="text text_type_main-default text_color_inactive">
          Вы новый пользователь?{" "}
          <a
            className={classNames("text text_type_main-default", css.form_link)}
            href="/register"
          >
            Зарегистрироваться
          </a>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <a
            className={classNames("text text_type_main-default", css.form_link)}
            href="/forgot-password"
          >
            Восстановить пароль
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
