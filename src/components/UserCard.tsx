import { FC } from 'react';
import { UserProfile } from '../types/UserCard';
import styled from 'styled-components';

type Props = {
  user: UserProfile;
};

export const UserCard: FC<Props> = (props) => {
  const { user } = props;
  return (
    <SContainer>
      <dl>
        <dt>名前</dt>
        <dd>{user.name}</dd>
        <dt>メール</dt>
        <dd>{user.email}</dd>
        <dt>住所</dt>
        <dd>{user.address}</dd>
      </dl>
    </SContainer>
  );
};

const SContainer = styled.div`
  border: solid 2px #ccc;
  border-radius: 8px;
  padding: 0 16px;
  margin: 8px;
`;
