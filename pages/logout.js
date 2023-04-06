import { useEffect } from "react";
import { useRouter } from "next/router";
import { logout } from "../lib/auth";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push("/");
  }, [router]);

  return null;
};

export default Logout;
