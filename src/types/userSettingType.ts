import { Dispatch, SetStateAction } from 'react';

export type UserSettingType = {
  awsEnv: string;
  setAwsEnv: Dispatch<SetStateAction<string>>;
};
