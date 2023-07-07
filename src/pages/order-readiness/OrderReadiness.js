import classNames from "classnames";

import css from "./index.module.scss";

const OrderReadiness = () => {
  return (
    <div className={css.readiness_container}>
      <div className={css.status_wrapper}>
        <div className={css.status_ready}>
          <h3
            className={classNames(
              "text text_type_main-medium",
              css.status_text
            )}
          >
            Готовы:
          </h3>
          <div className={css.status_numbers}>
            <p
              className={classNames(
                "text text_type_digits-default",
                css.number_ready
              )}
            >
              654343
            </p>
            <p
              className={classNames(
                "text text_type_digits-default",
                css.number_ready
              )}
            >
              5432
            </p>
          </div>
        </div>
        <div className={css.status_cook}>
          <h3
            className={classNames(
              "text text_type_main-medium",
              css.status_text
            )}
          >
            В работе:
          </h3>
          <div className={css.status_numbers}>
            <p
              className={classNames(
                "text text_type_digits-default",
                css.number_cook
              )}
            >
              5432
            </p>
            <p
              className={classNames(
                "text text_type_digits-default",
                css.number_cook
              )}
            >
              5432
            </p>
            <p
              className={classNames(
                "text text_type_digits-default",
                css.number_cook
              )}
            >
              5432
            </p>
          </div>
        </div>
      </div>
      <div className={css.done}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p
          className={classNames("text text_type_digits-large", css.number_done)}
        >
          28978
        </p>
      </div>
      <div className={css.done}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p
          className={classNames("text text_type_digits-large", css.number_done)}
        >
          28978
        </p>
      </div>
    </div>
  );
};

export default OrderReadiness;
