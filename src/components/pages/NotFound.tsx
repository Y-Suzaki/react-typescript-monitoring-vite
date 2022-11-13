import { FC, memo } from 'react';

// 無名関数だとLinterで指摘される。
export const NotFound: FC = memo(function Home() {
  return <p>NotFoundページ</p>;
});
