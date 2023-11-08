"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../utils/schema";
// import { NAME_TRANS_EN } from "@/app/config/constant";
import {
  // strengthColor,
  strengthIndicator,
} from "@/app/utils/password-strength";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import { TbEye, TbEyeOff } from "react-icons/tb";
import CustomInput from "@/app/components/custom-input/CustomInput";
import CustomButton from "@/app/components/custom-button/CustomButton";
import { API_MESSAGE, HTTP_REQUEST_METHOD, HTTP_RESPONSE_STATUS, NAME_TRANS_EN } from "@/app/config/constant";
import { getPasswordStrengthCssClass } from "@/app/utils";

const useSignupFormControl = () => {
  const router = useRouter();
  const maxDate = useMemo(() => moment().subtract(15, "years"), []);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [strength, setStrength] = useState<number>(0);
  // const [level, setLevel] = useState<{ label: string; color: string } | null>(
  //   null
  // );

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    // setLevel(strengthColor(temp));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
        method: HTTP_REQUEST_METHOD.POST,
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

      if (result.status === HTTP_RESPONSE_STATUS.OK) {
        setTimeout(() => {
          router.push("/auth/verify");
        }, 2000);
        return;
      }

      const resJson = await result.json();
      toast.error(resJson.message || API_MESSAGE.UPDATE_FAIL);
    },
  });

  const passwordStrengthClass = useMemo(() => {
    return getPasswordStrengthCssClass(strength);
  }, [strength]);

  const indicatorPassword = (
    <div className="absolute flex h-1 w-full flex-nowrap px-4">
      {Array.from({ length: 5 }, (_, index) => index).map(index => <div key={index + "_"} className={`mx-1 h-full w-1/5 rounded-full border-2 ${strength >= index ? passwordStrengthClass : "border-gray-100"}`}></div>)}
    </div>
  );

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

  useEffect(() => {
    changePassword(values.password);
  }, [values.password]);

  return {
    errors,
    handleBlur,
    handleChange,
    isValid,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    indicatorPassword
  };
};

const SignUpComponent = () => {

  const {
    errors,
    handleBlur,
    handleChange,
    isValid,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    // setFieldValue,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    indicatorPassword
  } = useSignupFormControl();

  return (
    <>
      <div className="flex min-h-screen flex-wrap overflow-hidden md:overflow-auto">
        <div className="flex h-screen w-full items-center justify-center bg-base-200 py-16 md:w-2/3">
          <form
            onSubmit={handleSubmit}
            className="mx-4 w-full max-w-screen-md overflow-hidden rounded-lg bg-base-100 shadow-md md:w-4/5"
          >
            <div className="px-6 py-8">
              <h2 className="mb-4 text-center text-3xl font-bold">{NAME_TRANS_EN.SIGN_IN_TITLE}</h2>
              <div className="mb-6 grid grid-cols-6 gap-2">
                <div className="col-span-3">
                  <CustomInput
                    label={NAME_TRANS_EN.FIRST_NAME}
                    type="text"
                    placeholder={NAME_TRANS_EN.FIRST_NAME}
                    name="first_Name"
                    value={values.first_Name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.first_Name && errors.first_Name)}
                    errorMessage={errors.first_Name}
                    cypressData="first-name"
                  />
                </div>
                <div className="col-span-3">
                  <CustomInput
                    label={NAME_TRANS_EN.LAST_NAME}
                    type="text"
                    placeholder={NAME_TRANS_EN.LAST_NAME}
                    name="last_Name"
                    value={values.last_Name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.last_Name && errors.last_Name)}
                    errorMessage={errors.last_Name}
                    cypressData="last-name"
                  />
                </div>
                <div className="col-span-6">
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
                    cypressData="email"
                  />
                </div>
                <div className="col-span-3">
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
                    bottomComponent={indicatorPassword}
                    cypressData="password"
                  />
                </div>
                <div className="col-span-3">
                  <CustomInput
                    endIcon={
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
                    onEndIconClick={handleClickShowConfirmPassword}
                    label={NAME_TRANS_EN.CONFIRM_PASSWORD}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={NAME_TRANS_EN.CONFIRM_PASSWORD}
                    name="confirm_password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.confirm_password && errors.confirm_password)}
                    errorMessage={errors.confirm_password}
                    cypressData="confirm-password"
                  />
                </div>
                <div className="col-span-6">
                  <CustomInput
                    label={NAME_TRANS_EN.PHONE_NUMBER}
                    type="text"
                    placeholder={NAME_TRANS_EN.PHONE_NUMBER}
                    name="phone_number"
                    value={values.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.phone_number && errors.phone_number)}
                    errorMessage={errors.phone_number}
                    cypressData="phone-number"
                  />
                </div>
                {/* <div className="col-span-6">
                  <CustomInput
                    label={NAME_TRANS_EN.LAST_NAME}
                    type="text"
                    placeholder={NAME_TRANS_EN.LAST_NAME}
                    name="last_Name"
                    value={values.last_Name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.last_Name && errors.last_Name)}
                    errorMessage={errors.last_Name}
                  />
                </div> */}
              </div>
              <CustomButton type="submit" cypressData="button-register-default" loading={isSubmitting} disabled={!isValid}>
                {NAME_TRANS_EN.SIGN_UP}
              </CustomButton>
            </div>
            <div className="bg-base-100 px-6 py-4">
              <p className="text-sm text-neutral-content">
                {NAME_TRANS_EN.ALREADY_HAVE_ACCOUNT}
                {" "}
                <Link href={{
                  pathname: "/auth/login"
                }}
                  className="font-bold text-info hover:underline"
                >
                  {NAME_TRANS_EN.SIGN_IN}
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden w-full bg-base-300 md:block md:w-1/3">
          <img
            className="h-screen w-full object-cover"
            src="https://i.pinimg.com/564x/0e/93/a2/0e93a2f8b0d20439b075ae3dccfa8e03.jpg"
            alt="Image"
          />
        </div>
      </div>
    </>
  );
};

export default SignUpComponent;
