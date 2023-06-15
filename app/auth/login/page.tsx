"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { signInSchema } from "../schema";
import { API_MESSAGE, NAME_TRANS_EN } from "@/app/config/constant";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Animate from "@/app/components/extended/Animate";
import { TbEye, TbEyeOff } from "react-icons/tb";
import CustomInput from "@/app/components/custom-input/CustomInput";

const SignInComponent = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await fetch("/dashboard");
      await signIn("google");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : API_MESSAGE.SERVER_ERROR
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (_values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      const result = await signIn("credentials", {
        redirect: false,
        ..._values,
      });
      await fetch("/dashboard");
      formikHelpers.setSubmitting(false);
      if (!result) {
        toast.error("Error");
        return;
      }
      const { ok, error } = result;
      if (ok) {
        router.push("/dashboard");
        return;
      }
      toast.error(error || "");
    },
  });

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    touched,
    values,
    isSubmitting,
    setSubmitting,
  } = formik;

  return (
    <>
      <>
        <div className="flex min-h-screen flex-wrap">
          <div className="flex w-full items-center justify-center bg-gray-100 py-16 md:w-2/3">
            <Animate animateWhenInView>
              <div className="mx-4 w-full max-w-screen-sm overflow-hidden rounded-lg bg-white shadow-md">
                <div className="px-6 py-8">
                  <h2 className="mb-4 text-center text-3xl font-bold">Login</h2>
                  <div className="mb-6">
                    <CustomInput
                      label="Email"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-200"
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <CustomInput
                      rightIcon={
                        showPassword ? (
                          <TbEye
                            stroke={"currentColor"}
                            strokeWidth={"1.5"}
                            size="1.5rem"
                          />
                        ) : (
                          <TbEyeOff
                            stroke={"currentColor"}
                            strokeWidth={"1.5"}
                            size="1.5rem"
                          />
                        )
                      }
                      onRightIconClick={handleClickShowPassword}
                      label="Password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-200"
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center">
                      <input className="mr-1" type="checkbox" />
                      <label
                        className="text-sm text-gray-700"
                        htmlFor="remember"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      className="text-sm font-bold text-blue-500 hover:underline"
                      href="#"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    className="focus:shadow-outline w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none"
                    type="button"
                  >
                    Login
                  </button>
                  <button
                    className="focus:shadow-outline w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none"
                    type="button"
                    onClick={handleGoogleLogin}
                  >
                    Login With Google <FcGoogle
                      stroke={"currentColor"}
                      strokeWidth={"1.5"}
                      size="1.5rem"
                    />
                  </button>
                </div>
                <div className="bg-gray-100 px-6 py-4">
                  <p className="text-sm text-gray-700">
                    Don't have an account?{" "}
                    <Link
                      className="font-bold text-blue-500 hover:underline"
                      href="/auth/register"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </Animate>
          </div>
          <div className="w-full bg-gray-300 md:w-1/3">
            <img
              className="h-full w-full object-cover"
              src="image.jpg"
              alt="Image"
            />
          </div>
        </div>
      </>
    </>
  );
};

export default SignInComponent;
