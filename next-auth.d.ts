import "next-auth";

declare module "next-auth" {
  interface Session {
    token?: accessToken;
    user?: {
      name: string;
      email: string;
      picture: string;
      sub: string;
      id: string;
      image: string;
      emailVerified: null;
      iat: number;
      exp: number;
      jti: string;
    } & Session["user"];
  }
}
