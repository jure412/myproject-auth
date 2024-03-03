"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "../Link/Link";
import LinkOnClick from "../Link/LinkOnClick";
import Loading from "../Loading/Loading";
import styles from "./Header.module.scss";

const Header = () => {
  const session = useSession();
  return (
    <header className={styles.header}>
      <Link style={{ marginRight: "auto" }} href="/">
        Home
      </Link>
      {session.status === "loading" ? (
        <Loading />
      ) : session.status === "unauthenticated" ? (
        <>
          <Link href="/signin">Sign in</Link>
          <Link href="/register">Register</Link>
        </>
      ) : (
        <>
          <Link href="/shoppingList">ShoppingLists</Link>
          <Link href="/profile">Profile</Link>
          <LinkOnClick
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </LinkOnClick>
        </>
      )}
    </header>
  );
};
export default Header;
