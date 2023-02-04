import { createContext, ReactNode, useState } from 'react';
import { UserSettingType } from '../types/userSettingType';
import { getAwsDefaultEnv } from '../helper/viteEnv';

export const UserSettingContext = createContext<UserSettingType>({} as UserSettingType);

export const UserSettingProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [awsEnv, setAwsEnv] = useState(getAwsDefaultEnv());
  const userSetting: UserSettingType = {
    awsEnv,
    setAwsEnv,
  };
  return <UserSettingContext.Provider value={userSetting}>{children}</UserSettingContext.Provider>;
};
