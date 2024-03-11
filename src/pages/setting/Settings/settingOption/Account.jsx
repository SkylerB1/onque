import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { Input, Button } from "@material-tailwind/react";

const Account = () => {
  const user = useSelector((state) => state.user.value);
  const { register, handleSubmit, watch, formState: { errors }, setValue} = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const [userLocalSettings, setUserLocalSettings] = useState({
    language: '',
    timezone: ''
  });

  useEffect(() => {
    const browserLanguage = navigator.language || navigator.userLanguage;
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserLocalSettings({
      language: browserLanguage,
      timezone: browserTimezone
    });
    setValue('language', browserLanguage);
    setValue('timezone', browserTimezone);
  }, [setValue]);

  return (
    <div>
      <div className="text-lg font-semibold mb-10">Personal information</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-1 justify-between w-[80rem] gap-6">
            <div className="mb-4 w-full">
              <Input
                type="text"
                {...register('firstName', { required: true })}
                label="First Name"
                size="regular"
                className="focus:shadow-none"
                defaultValue={user?.firstName}
              />
            </div>
            <div className="mb-4  w-full">
              <Input
                type="text"
                {...register('lastName', { required: true })}
                label="Last Name"
                size="regular"
                className="focus:shadow-none"
                defaultValue={user?.lastName}
              />
            </div>
          </div>
          <div className="text-lg font-semibold mt-10 mb-10">
            Preferences
          </div>
          <div className="flex flex-1 justify-between w-[80rem] gap-6">
            <div className="mb-4 w-full">
              <Input
                type="text"
                {...register('language', { required: true })}
                label="Language"
                size="regular"
                className="focus:shadow-none"
                defaultValue={userLocalSettings.language}
              />
            </div>
            <div className="mb-4  w-full">
              <Input
                type="text"
                {...register('timezone', { required: true })}
                label="Timezone"
                size="regular"
                className="focus:shadow-none"
                defaultValue={userLocalSettings.timezone}
              />
            </div>
          </div>
          <Button type="submit" className="mt-10 px-10 bg-black text-white">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Account;
