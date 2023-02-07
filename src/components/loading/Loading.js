import css from "./index.module.scss";

const Loading = ({ style }) => {
  return (
    <div className={css.loading_container} style={style}>
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
