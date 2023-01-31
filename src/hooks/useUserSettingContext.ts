import { useContext } from 'react';
import { UserSettingContext } from '../providers/UserSettingProvider';
import { UserSettingType } from '../types/userSettingType';

export const useUserSettingContext = (): UserSettingType => useContext(UserSettingContext);
