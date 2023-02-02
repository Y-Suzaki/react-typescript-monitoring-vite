import { FC, memo, useCallback, useEffect, useState, useReducer } from 'react';
import { Header } from '../organisms/Header';
import { useHome } from '../../hooks/useHome';
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { a } from 'aws-amplify';

type State = {
  count: number;
};

type Action = {
  type: string;
};

const reducer = (state: State, action: Action) => {
  console.log('Reducer:', state, action);
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// 無名関数だとLinterで指摘される。
export const Home: FC = memo(function Home() {
  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const { user } = useHome(count);

  // onClickにuseCallbackがない場合、Stateの変更ごとに関数も再作成される。
  // その結果、子コンポーネントであるPrimaryButtonを再レンダリングされてしまう。
  const onClickPrimary = useCallback(() => {
    console.log('子コンポーネントボタンがClickされた。');
  }, []);

  const onClickButton = () => {
    setCount((count) => count + 1);
    dispatch({ type: 'INCREMENT' });
  };

  // useEffect(() => {
  //   console.log(count);
  // }, [count]);

  return (
    <>
      {/*<Header />*/}
      <p>Homeページ</p>
      <p>{user}</p>
      <p>State Count: {count}</p>
      <p>Reducer Count: {state.count}</p>
      <br />
      <button onClick={onClickButton}>Add</button>
      <br />
      <PrimaryButton onClick={onClickPrimary}>子コンポーネント</PrimaryButton>
    </>
  );
});
