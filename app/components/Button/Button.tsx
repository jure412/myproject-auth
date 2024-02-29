import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import Loading from "../Loading/Loading";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  isLoading,
  children,
  className,
  isDisabled,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={isLoading || isDisabled}
      className={`${styles.button} ${className}`}
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
};

export default Button;
