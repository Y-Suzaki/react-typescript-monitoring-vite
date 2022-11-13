// ユーザー一覧を取得するカスタムフック
import { useState } from 'react';
import { UserProfile } from '../types/UserCard';
import axios from 'axios';
import { User } from '../types/api/user';

export const useUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUsers = () => {
    setIsLoading(true);
    setIsError(false);
    console.log('sss');
    axios
      .get<Array<User>>('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const data: Array<UserProfile> = response.data.map((user) => ({
          id: user.id,
          name: `${user.name}/${user.username}`,
          email: user.email,
          address: `${user.address.city} ${user.address.suite} ${user.address.street}`,
        }));
        console.log(data);
        setUserProfiles(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // 更新するための関数と、各Stateをreturnする。
  return {
    getUsers,
    userProfiles,
    isLoading,
    isError,
  };
};
