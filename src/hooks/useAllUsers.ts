import { useMessage } from './useMessage';
import { useCallback, useState } from 'react';
import { User } from '../types/api/user';
import axios from 'axios';

export const useAllUsers = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const getAllUsers = useCallback(() => {
    setLoading(true);

    axios
      .get<Array<User>>('https://jsonplaceholder.typicode.com/users/')
      .then((res) => {
        if (res.data) {
          setUsers(res.data);
        } else {
          showMessage({ title: "Can't get user list because of unexpected error.", status: 'error' });
        }
      })
      .catch(() => {
        showMessage({ title: "Can't get user list because of unexpected error.", status: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { loading, getAllUsers, users };
};
