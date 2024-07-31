import { useState } from "react";
import withAuth from "../components/withAuth";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";

function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = () => {
    setLoading(true);
    logout();
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center bg-[#CCFFDE] min-h-[100vh] flex-col gap-5 ">
      <p className=" font-bold text-3xl">Login SUCCESS</p>
      <p className=" font-semibold text-2xl">Welcome {user?.username}</p>
      <button
        onClick={handleLogout}
        className="bg-[#3A8869] w-4/12 text-white py-3 rounded-lg pl items-center justify-center flex"
      >
        {loading ? (
          <FaSpinner className="animate-spin w-6 h-6 text-white" />
        ) : (
          "Logout"
        )}
      </button>
    </div>
  );
}

export default withAuth(Home);
