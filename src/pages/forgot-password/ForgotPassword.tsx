import { useNavigate, Navigate } from "react-router-dom";
import React, { ChangeEvent, FormEvent, useState } from "react";
import classNames from "classnames";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import InputEmail from "../input-email/InputEmail";
import { useAuth } from "../auth";
import Loading from "../../components/loading/Loading";
import { forgotPassword } from "../../utils/api";

import css from "../index.module.scss";

const ForgotPassword = () => {
  const { isAuthenticated, isLoading, setIsActivePasswordReset } = useAuth();
  let navigate = useNavigate();

  const [value, setValue] = useState({
    email: "",
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
    await forgotPassword(value)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.success) {
          setIsActivePasswordReset(true);
          navigate("/reset-password");
        }

        if (!response.success) {
          setHasError(response.message);
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
        <h1 className="text text_type_main-large">Восстановление пароля</h1>
        <InputEmail
          value={value}
          changeValue={changeValue}
          placeholder={"Укажите e-mail"}
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
          Восстановить
        </Button>
      </form>
      <div className={css.form_text}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
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

export default ForgotPassword;
