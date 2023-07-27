import { Navigate, useNavigate } from "react-router-dom";
import React from "react";
import classNames from "classnames";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import InputPassword from "../input-password/InputPassword";
import { useAuth } from "../auth";
import Loading from "../../components/loading/Loading";
import { resetPassword } from "../../utils/api";

import css from "../index.module.scss";

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    isLoading,
    isActivePasswordReset,
    setIsActivePasswordReset,
  } = useAuth();

  const [value, setValue] = React.useState({
    password: "",
    token: "",
  });

  const [hasError, setHasError] = React.useState();

  const changeValue = (e) => {
    setValue(() => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  const post = async (event) => {
    event.preventDefault();
    await resetPassword(value)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.success) {
          navigate("/login");
          setIsActivePasswordReset(false);
        }

        if (!response.success) {
          setHasError(response.message);
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  if (!isActivePasswordReset) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <Loading style={{ height: "70vh" }} />;
  }

  return (
    <section className={css.form}>
      <form className={css.form_container} onSubmit={post}>
        <h1 className="text text_type_main-large">Востановление пароля</h1>
        <InputPassword
          changeValue={changeValue}
          value={value}
          placeholder={"Введите новый пароль"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={changeValue}
          name={"token"}
          size={"default"}
          extraClass="ml-1"
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
          Сохранить
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

export default ResetPassword;
