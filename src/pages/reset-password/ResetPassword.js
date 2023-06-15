import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import classNames from "classnames";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "../index.module.scss";
import InputPassword from "../input-password/InputPassword";
import { useAuth } from "../auth";
import Loading from "../../components/loading/Loading";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  const [value, setValue] = React.useState({
    password: "",
    token: "",
  });

  const changeValue = (e) => {
    setValue(() => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  const post = (e) => {
    e.preventDefault();
    const api = "https://norma.nomoreparties.space/api/password-reset/reset";
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/login");
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  if (!isAuthenticated) {
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
