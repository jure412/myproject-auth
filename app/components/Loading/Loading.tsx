import { FC } from "react";
import styles from "./loading.module.scss";

interface LoadingProps {
  className?: string;
}
const Loading: FC<LoadingProps> = ({ className }) => {
  const dynamicClassName = styles[className!] ? styles[className!] : "";
  return (
    <div className={`${styles.loading} ${dynamicClassName}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};
export default Loading;
