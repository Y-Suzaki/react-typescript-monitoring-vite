import { FC, memo, useCallback, useEffect } from 'react';
import { Header } from '../organisms/Header';
import { useAllUsers } from '../../hooks/useAllUsers';
// import { useSelectUser } from '../../hooks/useSelectUser';
import { Center, Spinner, Wrap, WrapItem, useDisclosure } from '@chakra-ui/react';
import { UserCard } from '../organisms/UserCard';
import { UserDetailModal } from '../organisms/UserDetailModal';
import { Simulate } from 'react-dom/test-utils';
import timeUpdate = Simulate.timeUpdate;
// import { useLoginUser } from '../../hooks/useLoginUser';

// 無名関数だとLinterで指摘される。
export const UserManagement: FC = memo(function UserManagement() {
  const { users, loading, getAllUsers } = useAllUsers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { selectedUser, selectUser } = useSelectUser();
  // const { loginUser } = useLoginUser();

  // 詳細画面時に呼ばれる関数
  const onClickUser = useCallback(
    (id: number) => {
      // selectUser(id, users, onOpen);
      // selectUser(id, users, onOpen);
    },
    [users],
  );

  // Mount時にユーザー一覧を取得する。
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Header />
      <p>UserManagementページ</p>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }} spacing="30px">
          {users.map((user) => (
            <WrapItem key={user.username} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClickUser={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      {/*<UserDetailModal isOpen={isOpen} onClose={onClose} user={selectedUser} isAdmin={loginUser?.isAdmin} />*/}
    </>
  );
});
