import React, { useState, useMemo } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schema";
import { NAME_TRANS_EN } from "@/app/config/constant";
import {
  strengthColor,
  strengthIndicator,
} from "@/app/utils/password-strength";
import Link from "next/link";
import Animate from "@/app/components/extended/Animate";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import { TbEye, TbEyeOff } from "react-icons/tb";
import CustomInput from "@/app/components/custom-input/CustomInput";
const SignUpComponent = () => {
  const router = useRouter();

  const maxDate = useMemo(() => moment().subtract(15, "years"), []);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [strength, setStrength] = useState<number>(0);
  const [level, setLevel] = useState<{ label: string; color: string } | null>(
    null
  );

  const formik = useFormik({
    initialValues: {
      first_Name: "",
      last_Name: "",
      email: "",
      password: "",
      confirm_password: "",
      address: "",
      date_of_birth: moment(maxDate).format("MM/DD/YYYY HH:mm"),
      country: "VNM",
      phone_number: "",
      gender: 0,
    },
    validationSchema: signUpSchema,
    onSubmit: async (_values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      const result = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ..._values,
        }),
      });
      formikHelpers.setSubmitting(false);
      if (!result) {
        toast.error("Error");
        return;
      }
      if (result.status === 200) {
        setTimeout(() => {
          router.push("/auth/verify");
        }, 2000);
      } else {
        toast.error(await result.text());
      }
    },
  });

  const {
    errors,
    handleBlur,
    handleChange,
    isValid,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    setFieldValue,
  } = formik;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    return;
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = () => {
    return;
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const getPasswordStrengthClass = () => {
    if (strength === 0) {
      return "";
    } else if (strength <= 1) {
      return "border-red-500";
    } else if (strength <= 2) {
      return "border-yellow-500";
    } else if (strength <= 3) {
      return "border-blue-500";
    } else if (strength <= 4) {
      return 'border-green-500';
    } else {
      return 'border-purple-500';
    }
  };

  const indicatorPassword = (
    <div className="absolute left-0 bottom-0 h-1 w-full">
      <div className={`h-full ${getPasswordStrengthClass()}`}></div>
      <div className={`h-full ${getPasswordStrengthClass()}`}></div>
      <div className={`h-full ${getPasswordStrengthClass()}`}></div>
      <div className={`h-full ${getPasswordStrengthClass()}`}></div>
    </div>
  );

  return (
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
                    bottomComponent={indicatorPassword}
                    label="Password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-200"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                  />
                </div>
                <div className="mb-6">
                  <CustomInput
                    rightIcon={
                      showConfirmPassword ? (
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
                    bottomComponent={indicatorPassword}
                    label="Confirm Password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-200"
                    type="password"
                    placeholder="Enter your password"
                    name="confirm_password"
                    onChange={handleChange}
                    value={values.confirm_password}
                  />
                </div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <input className="mr-1" type="checkbox" />
                    <label className="text-sm text-gray-700" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <a
                    className="text-sm font-bold text-blue-500 hover:underline"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <button
                  className="focus:shadow-outline w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none"
                  type="button"
                >
                  Login
                </button>
              </div>
              <div className="bg-gray-100 px-6 py-4">
                <p className="text-sm text-gray-700">
                  Don't have an account?{" "}
                  <a
                    className="font-bold text-blue-500 hover:underline"
                    href="#"
                  >
                    Sign Up
                  </a>
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
  );
};

export default SignUpComponent;
