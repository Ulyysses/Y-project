import css from "./index.module.scss";

const Loading = () => {
  return (
    <div className={css.loading_container}>
      <div className={css.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
