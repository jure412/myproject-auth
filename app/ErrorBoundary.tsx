"use client";
import React, { useEffect, useState } from "react";
import styles from "./global.module.scss";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div>
        <main className={`${styles.container}`}>
          <h1>
            <span className={`${styles.cWarning}`}>
              Something went wrong - 404
            </span>
          </h1>
        </main>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
