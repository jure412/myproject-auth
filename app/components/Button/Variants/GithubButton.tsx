import { signIn } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import Button from "../Button";

const GithubButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (isLoading) {
        setIsLoading(false);
      }
    };
  }, []);

  const handleGithubSubmit = async () => {
    setIsLoading(true);
    await signIn("github", { callbackUrl: "/" });
    setIsLoading(false);
  };
  return (
    <Button onClick={handleGithubSubmit} isLoading={isLoading}>
      Continue with GitHub
    </Button>
  );
};

export default GithubButton;
