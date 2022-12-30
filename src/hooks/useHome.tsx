import { useEffect, useState, useRef, useCallback } from 'react';

// 初回実行されないカスタムフック
export const useHome = (count: number) => {
  const [user, setUser] = useState('');
  // useRefで取得した値が変更されても、再レンダリングは行われない。
  // 単純に値を保持しておきたい場合に利用する。
  const isFirst = useRef(false);

  useEffect(() => {
    console.log('Effect call', count);
    get();
  }, [count]);

  const get = useCallback(() => {
    if (!isFirst.current || count === 0) {
      isFirst.current = true;
    } else {
      console.log('get call.', count);
      setUser(`Test user: ${count}`);
    }
  }, [count]);

  return { user };
};
