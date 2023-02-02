import { createContext, ReactNode, useState } from 'react';
import { UserSettingType } from '../types/userSettingType';

export const UserSettingContext = createContext<UserSettingType>({} as UserSettingType);

export const UserSettingProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [awsEnv, setAwsEnv] = useState('Staging');
  const userSetting: UserSettingType = {
    awsEnv,
    setAwsEnv,
  };
  return <UserSettingContext.Provider value={userSetting}>{children}</UserSettingContext.Provider>;
};
