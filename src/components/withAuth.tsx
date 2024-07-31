import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthHOC = (props: any) => {
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push("/login");
      }
    }, [token, router]);

    if (!token) {
      return (
        <div className="bg-[#3A8869] h-full w-full flex items-center justify-center">
          Loading...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
