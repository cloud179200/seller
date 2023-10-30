"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { signInSchema } from "../../utils/schema";
import { API_MESSAGE, NAME_TRANS_EN } from "@/app/config/constant";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { TbEye, TbEyeOff } from "react-icons/tb";
import CustomInput from "@/app/components/custom-input/CustomInput";
import CustomButton from "@/app/components/custom-button/CustomButton";

const useSigninFormControl = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setShowPassword(!showPassword);
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

  return {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    showPassword,
    handleClickShowPassword,
  };
};

const SignInComponent = () => {
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
    showPassword,
    handleClickShowPassword,
  } = useSigninFormControl();

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

  return (
    <>
      <>
        <div className="flex min-h-screen flex-wrap overflow-hidden md:overflow-auto">
          <div className="flex h-screen w-full items-center justify-center bg-gray-100 py-16 md:w-2/3">
            <form
              onSubmit={handleSubmit}
              className="mx-4 w-full max-w-screen-md overflow-hidden rounded-lg bg-white shadow-md md:w-4/5"
            >
              <div className="px-6 py-8">
                <h2 className="mb-4 text-center text-3xl font-bold">{NAME_TRANS_EN.SIGN_IN_TITLE}</h2>
                <div className="mb-6">
                  <CustomInput
                    label={NAME_TRANS_EN.EMAIL}
                    type="email"
                    placeholder={NAME_TRANS_EN.EMAIL}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    errorMessage={errors.email}
                    disabled={isSubmitting}
                    cypressData="email"
                  />
                </div>
                <div className="mb-6">
                  <CustomInput
                    endIcon={
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
                    onEndIconClick={handleClickShowPassword}
                    label={NAME_TRANS_EN.PASSWORD}
                    type={showPassword ? "text" : "password"}
                    placeholder={NAME_TRANS_EN.PASSWORD}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.password && errors.password)}
                    errorMessage={errors.password}
                    disabled={isSubmitting}
                    cypressData="password"
                    />
                </div>
                {/* <div className="mb-6 flex items-center justify-between">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input type="checkbox" className="checkbox mr-2" />
                      <span className="label-text">Remember me</span>
                    </label>
                  </div>
                  <Link 
                    className="text-sm font-bold text-blue-500 hover:underline"
                    href="#"
                  >
                    Forgot Password?
                  </Link>
                </div> */}
                <CustomButton type="submit" cypressData="button-login-default" loading={isSubmitting} disabled={!isValid}>
                  {NAME_TRANS_EN.SIGN_IN}
                </CustomButton>
                <CustomButton
                  className="btn-info btn-outline btn-block btn mt-2"
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting}
                  cypressData="login-button-google"
                >
                  {NAME_TRANS_EN.SIGN_IN_WITH_GOOGLE}

                  <FcGoogle
                    stroke={"currentColor"}
                    strokeWidth={"1.5"}
                    size="1.5rem"
                  />
                </CustomButton>
              </div>
              <div className="bg-gray-100 px-6 py-4">
                <p className="text-sm text-gray-700">
                  {NAME_TRANS_EN.DONT_HAVE_ACCOUNT}
                  {" "}
                  <Link
                    className="font-bold text-blue-500 hover:underline"
                    href="/auth/register"
                  >
                    {NAME_TRANS_EN.SIGN_UP}
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="hidden w-full bg-gray-300 md:block md:w-1/3">
            <img
              className="h-screen w-full object-cover"
              src="https://i.pinimg.com/564x/0e/93/a2/0e93a2f8b0d20439b075ae3dccfa8e03.jpg"
              alt="Image"
            />
          </div>
        </div>
      </>
    </>
  );
};

export default SignInComponent;
