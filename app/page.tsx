import { NextPage } from "next";
import styles from "./global.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <h1>RESPONSIVE GRID</h1>
      <div className={styles.row}>
        <div
          className={`${styles.col6} ${styles.colSm12} ${styles.colMd4} ${styles.colXl10}`}
        >
          <div
            style={{ backgroundColor: "red", width: "auto", height: "50px" }}
          ></div>
        </div>
        <div
          className={`${styles.col6} ${styles.colSm12} ${styles.colMd4} ${styles.colXl1} `}
        >
          <div
            style={{ backgroundColor: "red", width: "auto", height: "50px" }}
          ></div>
        </div>
        <div
          className={`${styles.col12} ${styles.colSm12} ${styles.colMd4} ${styles.colXl1} `}
        >
          <div
            style={{ backgroundColor: "red", width: "auto", height: "50px" }}
          ></div>
        </div>
      </div>

      <div className={styles.row}>
        <div
          className={`${styles.col6} ${styles.colSm12} ${styles.colMd4} ${styles.colXl10}`}
        >
          <div
            style={{ backgroundColor: "blue", width: "auto", height: "50px" }}
          ></div>
        </div>
        <div
          className={`${styles.col6} ${styles.colSm12} ${styles.colMd4} ${styles.colXl1} `}
        >
          <div
            style={{ backgroundColor: "blue", width: "auto", height: "50px" }}
          ></div>
        </div>
        <div
          className={`${styles.col12} ${styles.colSm12} ${styles.colMd4} ${styles.colXl1} `}
        >
          <div
            style={{ backgroundColor: "blue", width: "auto", height: "50px" }}
          ></div>
        </div>
      </div>
    </>
  );
};
export default Home;
