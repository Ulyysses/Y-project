import React, { useRef } from "react";
import classNames from "classnames";
import {
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useAuth } from "../auth";
import { refreshUserRequest } from "../../utils/api";
import ProfileNav from "../profile-nav/ProfileNav";

import css from "./index.module.scss";

const Profile = () => {
  const { user } = useAuth();

  const [value, setValue] = React.useState({
    name: user.name,
    email: user.email,
  });

  const onChange = (event) => {
    setValue(() => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };

  const changeInfo = async () => {
    const data = await refreshUserRequest(value).then((res) => {
      return res.json();
    });

    if (data.success) {
      setValue(value);
    }
  };

  const resetInfo = () => {
    setValue({
      name: user.name,
      email: user.email,
    });
  };

  const inputRef = useRef(null);

  const [disabled, setDisabled] = React.useState(true);

  const isChanged = value.name !== user.name || value.email !== user.email;

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setDisabled(false);
  };

  const onBlur = () => {
    setDisabled(true);
  };

  return (
    <div className={css.profile}>
      <div className={css.profile_nav}>
        <ProfileNav />
        <p
          className={classNames(
            "text text_type_main-default",
            css.profile_text
          )}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={css.profile_inputs}>
        <Input
          ref={inputRef}
          onChange={onChange}
          icon={"EditIcon"}
          value={value.name}
          name={"name"}
          placeholder="Имя"
          extraClass="mb-2"
          disabled={disabled}
          type="text"
          onIconClick={onIconClick}
          onBlur={onBlur}
        />
        <EmailInput
          onChange={onChange}
          value={value.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-2"
        />
        <div className={css.profile_buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={resetInfo}
            disabled={!isChanged}
          >
            Отмена
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            onClick={changeInfo}
            disabled={!isChanged}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
