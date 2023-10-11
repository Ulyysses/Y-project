import css from "./index.module.scss";

interface ILoadingProps {
  style?: {
    height: string;
  };
}

const Loading = ({ style }: ILoadingProps) => {
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
