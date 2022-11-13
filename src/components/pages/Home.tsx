import { FC, memo } from 'react';
import { Header } from '../organisms/Header';

// 無名関数だとLinterで指摘される。
export const Home: FC = memo(function Home() {
  return (
    <>
      <Header />
      <p>Homeページ</p>
    </>
  );
});
