"use client";
import React, { useEffect, useMemo, useState } from "react";
import CustomBox from "@/app/components/custom-box/CustomBox";
import {
  API_MESSAGE,
  HTTP_REQUEST_METHOD,
  HTTP_RESPONSE_STATUS,
  NOTIFICATION_KEYS,
} from "@/app/config/constant";
import { NotificationSettings } from "@prisma/client";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import tickIOS from "@/app/assets/lottie/tick-ios.json";
import { IResponseErrorObject, IResponseSuccessObject } from "../utils/interface";

const useNotificationSettings = () => {
  const [listNotificationSetting, setListNotificationSetting] = useState<NotificationSettings[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSetNotificationSetting: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    setIsLoading(true);
    const result = await fetch("/api/setting/set-notification", {
      method: HTTP_REQUEST_METHOD.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: e.target.name,
        value: e.target.checked,
      }),
    });
    setIsLoading(false);
    if (result.status === HTTP_RESPONSE_STATUS.OK) {
      toast(API_MESSAGE.UPDATE_SUCCESS, {
        className: "toast-success font-medium",
        icon: (
          <Lottie
            className="h-8 w-8"
            animationData={tickIOS}
            initialSegment={[14, 28]}
          />
        ),
        duration: 1500,
      });
      const targetItem = listNotificationSetting.find(item => item.setting_key === e.target.name);
      if (targetItem) {
        setListNotificationSetting(prevList => {
          const newList = prevList.map(item => item.setting_key === e.target.name ? { ...item, setting_value: !item.setting_value } : item);
          return newList;
        });
        return;
      }
      getNotificationsSetting();
      return;
    }
    const resJson: IResponseErrorObject = (await result.json()) as unknown as IResponseErrorObject;
    toast.error(resJson.message || API_MESSAGE.UPDATE_FAIL, {
      className: "toast-error",
    });
  };

  const getNotificationsSetting = async () => {
    setIsLoading(true);
    const result = await fetch("/api/setting/get-notification", {
      method: HTTP_REQUEST_METHOD.GET
    });
    setIsLoading(false);
    if (result.status === HTTP_RESPONSE_STATUS.OK) {
      const resJson: IResponseSuccessObject<NotificationSettings> = (await result.json()) as unknown as IResponseSuccessObject<NotificationSettings>;
      setListNotificationSetting(resJson.data as NotificationSettings[]);
      return;
    }
    const resJson: IResponseErrorObject = (await result.json()) as unknown as IResponseErrorObject;
    toast.error(resJson.message || API_MESSAGE.UPDATE_FAIL, {
      className: "toast-error",
    });
  };

  return { listNotificationSetting, handleSetNotificationSetting, getNotificationsSetting, isLoading };
};

const Notification = () => {
  const { listNotificationSetting, handleSetNotificationSetting, getNotificationsSetting, isLoading } = useNotificationSettings();

  const listRender = useMemo(() => {
    const listFormatted = Object.values(NOTIFICATION_KEYS).map((val) => {
      const notificationSettingData = listNotificationSetting.find(
        (item) => item.setting_key === val
      );
      return {
        label: val.split("_").join(" ").toLowerCase(),
        value: val,
        disabled: false,
        checked: notificationSettingData ? notificationSettingData.setting_value : false,
      };
    });

    return listFormatted.map((item) => (
      <CustomBox key={item.value} className="col-span-12 max-h-[68px] border-[1px]">
        <div className="form-control p-4">
          <label className="label cursor-pointer">
            <span className="label-text capitalize">{item.label}</span>
            <input
              data-cy={`checkbox-${item.value}`}
              type="checkbox"
              className="toggle"
              checked={item.checked}
              name={item.value}
              disabled={item.disabled || isLoading}
              onChange={handleSetNotificationSetting}
            />
          </label>
        </div>
      </CustomBox>
    ));
  }, [listNotificationSetting]);

  useEffect(() => {
    getNotificationsSetting();
  }, []);

  return <div className="h-[80vh] w-full">
    <div className="grid w-full grid-cols-12 gap-2 p-2">
      {listRender}
    </div>
  </div>;
};

export default Notification;
