import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ErrorBoundary from "./ErrorBoundary";
import Providers from "./Providers/Providers";
import Header from "./components/Header/Header";
import styles from "./global.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={styles.default} lang="en">
      <body className={styles.body} suppressHydrationWarning={true}>
        <ErrorBoundary>
          <Providers>
            <Header />
            <main className={styles.container}>{children}</main>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
