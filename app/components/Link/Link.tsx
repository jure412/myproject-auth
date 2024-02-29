import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { CSSProperties, FC, ReactNode } from "react";
import styles from "./Link.module.scss";

interface LinkProps extends NextLinkProps {
  style?: CSSProperties;
  children: ReactNode;
  className?: string;
}

const Link: FC<LinkProps> = ({ children, className, style, ...rest }) => {
  return (
    <NextLink style={style} className={className || styles.primary} {...rest}>
      {children}
    </NextLink>
  );
};

export default Link;
