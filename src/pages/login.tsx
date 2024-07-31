/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function Login() {
  const { login, token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    setErrorMessage("");
    try {
      await login(data.username, data.password);
      router.push("/");
    } catch (error) {
      setErrorMessage("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  if (token) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 place-items-center min-h-[100vh]">
      <div className=" w-full px-36 ">
        <div className="flex flex-col justify-center w-full items-center ">
          <IoChatbubblesSharp className="w-12 h-12 mb-4" />
          <p className="text-black font-bold text-3xl mb-8 ">LOGIN</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <input
            className="p-2 rounded-lg pl ring-2 ring-gray-400"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username && <span>Username is required</span>}
          <input
            className="p-2 rounded-lg pl ring-2 ring-gray-400"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Password is required</span>}
          {errorMessage && <div>{errorMessage}</div>}
          <button
            type="submit"
            className="bg-[#3A8869] w-full text-white py-3 rounded-lg pl items-center justify-center flex"
          >
            {loading ? (
              <FaSpinner className="animate-spin w-6 h-6 text-white" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
      <div className="bg-[#3A8869] h-full w-full flex items-center justify-center">
        <div className="bg-white p-4 rounded-full">
          <img src="./assets/login-icon.png" className="w-64 h-auto" />
        </div>
      </div>
    </div>
  );
}
