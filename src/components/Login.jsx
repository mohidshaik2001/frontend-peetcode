import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "./index.js";
import authService from "../api/auth.js";
import { login } from "../store/authslice.js";
import { RadioGroup, Radio, Label } from "@headlessui/react";
import { Logo } from "./index.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loginType, setLoginType] = useState("email");
  const { register, handleSubmit } = useForm();

  const loginHandler = async (data) => {
    setError("");
    try {
      const userData = await authService.loginUser({
        email: loginType === "email" ? data.email : undefined,
        username: loginType === "username" ? data.username : undefined,
        password: data.password,
      });
      if (userData) {
        console.log("userData in Logincomponent", userData);
        dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight ">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Signup
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(loginHandler)} className="mt-8">
          <div className="flex items-center mb-4">
            <RadioGroup
              value={loginType}
              onChange={setLoginType}
              className="flex items-center space-x-4"
            >
              <Radio value="email">
                {({ checked }) => (
                  <span className={checked ? "font-bold" : ""}>Email</span>
                )}
              </Radio>
              <Radio value="username">
                {({ checked }) => (
                  <span className={checked ? "font-bold" : ""}>Username</span>
                )}
              </Radio>
            </RadioGroup>
          </div>

          <div className="space-y-5 flex flex-col justify-between items-center">
            {loginType === "email" && (
              <Input
                label="Email: "
                palceholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
            )}
            {loginType === "username" && (
              <Input
                label="Username: "
                palceholder="Enter your username"
                type="text"
                {...register("username", {
                  required: true,
                })}
              />
            )}
            <Input
              label="Password"
              type="password"
              palceholder="Enter Password"
              {...register("password", {
                required: true,
              })}
            />
            <div className="items-center justify-between bg-amber-500 w-1/3 rounded-md hover:bg-amber-300">
              <button type="submit" className="w-full ">
                Login In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
