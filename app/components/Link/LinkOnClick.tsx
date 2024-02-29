import { FC, HTMLAttributes, ReactNode } from "react";
import styles from "./Link.module.scss";

interface LinkProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const LinkOnClick: FC<LinkProps> = ({ children, className, ...rest }) => {
  return (
    <div className={className || styles.primary} {...rest}>
      {children}
    </div>
  );
};

export default LinkOnClick;
