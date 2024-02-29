"use client";
import React, { useEffect, useState } from "react";

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
        <h1>Something went wrong.</h1>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
