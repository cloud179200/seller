import React, { useEffect, useMemo, useState } from "react";
import { usePrevious } from "@reactuses/core";
import { faker } from "@faker-js/faker";
import { useSession } from "next-auth/react";
import _ from "underscore";
import { useFormik } from "formik";
import { changePasswordSchema } from "../utils/schema";
import { strengthIndicator } from "../utils/password-strength";
import CustomInput from "../components/custom-input/CustomInput";
import { NAME_TRANS_EN } from "../config/constant";
import { TbEye, TbEyeOff } from "react-icons/tb";
import CustomButton from "../components/custom-button/CustomButton";

const useChangePasswordFormControl = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [strength, setStrength] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (_values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      formikHelpers.setSubmitting(false);
    },
  });

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };
  const changeNewPassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    // setLevel(strengthColor(temp));
  };
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

  const passwordStrengthClass = useMemo(() => {
    if (strength === 0) {
      return "border-red-500";
    } else if (strength <= 1) {
      return "border-yellow-500";
    } else if (strength <= 2) {
      return "border-blue-500";
    } else if (strength <= 3) {
      return "border-green-500";
    } else if (strength <= 4) {
      return "border-purple-500";
    }
  }, [strength]);

  const indicatorPassword = (
    <div className="absolute flex h-1 w-full flex-nowrap px-4">
      {Array.from({ length: 5 }, (_, index) => index).map((index) => (
        <div
          key={index + "_"}
          className={`mx-1 h-full w-1/5 rounded-full border-2 ${
            strength >= index ? passwordStrengthClass : "border-gray-100"
          }`}
        ></div>
      ))}
    </div>
  );

  useEffect(() => {
    changeNewPassword(values.new_password);
  }, [values.new_password]);

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
    showOldPassword,
    showNewPassword,
    showConfirmNewPassword,
    handleClickShowOldPassword,
    handleClickShowNewPassword,
    handleClickShowConfirmNewPassword,
    indicatorPassword,
  };
};

const ChangePasswordForm = () => {
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
    showOldPassword,
    showNewPassword,
    showConfirmNewPassword,
    handleClickShowOldPassword,
    handleClickShowNewPassword,
    handleClickShowConfirmNewPassword,
    indicatorPassword,
  } = useChangePasswordFormControl();

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-y-4">
      <div className="col-span-6">
        <CustomInput
          endIcon={
            showOldPassword ? (
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
          onEndIconClick={handleClickShowOldPassword}
          label={NAME_TRANS_EN.OLD_PASSWORD}
          type={showOldPassword ? "text" : "password"}
          placeholder={NAME_TRANS_EN.OLD_PASSWORD}
          name="old_password"
          value={values.old_password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.old_password && errors.old_password)}
          errorMessage={errors.old_password}
        />{" "}
      </div>{" "}
      <div className="col-span-6">
        {" "}
        <CustomInput
          endIcon={
            showNewPassword ? (
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
          onEndIconClick={handleClickShowNewPassword}
          label={NAME_TRANS_EN.PASSWORD}
          type={showNewPassword ? "text" : "password"}
          placeholder={NAME_TRANS_EN.PASSWORD}
          name="new_password"
          value={values.new_password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.new_password && errors.new_password)}
          errorMessage={errors.new_password}
          bottomComponent={touched.new_password && indicatorPassword}
        />{" "}
      </div>{" "}
      <div className="col-span-6">
        {" "}
        <CustomInput
          endIcon={
            showConfirmNewPassword ? (
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
          onEndIconClick={handleClickShowConfirmNewPassword}
          label={NAME_TRANS_EN.CONFIRM_PASSWORD}
          type={showConfirmNewPassword ? "text" : "password"}
          placeholder={NAME_TRANS_EN.CONFIRM_PASSWORD}
          name="confirm_new_password"
          value={values.confirm_new_password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(
            touched.confirm_new_password && errors.confirm_new_password
          )}
          errorMessage={errors.confirm_new_password}
        />{" "}
      </div>{" "}
      <div className="col-start-3 col-end-5 flex items-center justify-center">
        <CustomButton type="submit" loading={isSubmitting} disabled={!isValid}>
          {" "}
          {NAME_TRANS_EN.CHANGE_PASSWORD}{" "}
        </CustomButton>{" "}
      </div>
    </form>
  );
};

const User = () => {
  const { data } = useSession();
  const previousData = usePrevious(data);

  const userInfo = useMemo(
    () => (
      <div className="hero-content flex flex-col items-start justify-start">
        <img
          src={data?.user?.image || faker.image.avatar()}
          className="max-w-sm rounded-lg shadow-2xl"
          alt="avatar"
        />
        <div>
          <h1 className="text-5xl font-bold">{data?.user?.email}</h1>
          <p className="py-6">{data?.user?.email}</p>
        </div>
      </div>
    ),
    [_.isEqual(previousData, data)]
  );

  return (
    <div className="m-4 grid grid-cols-6 gap-4">
      <div className="col-span-6 md:col-span-3">{userInfo}</div>
      <div className="col-span-6 md:col-span-3">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default User;
