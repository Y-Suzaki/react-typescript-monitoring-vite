export const getCurrentDate = () => {
  // 実行環境に依存するが、日本国内（JST）で利用される前提
  const today = new Date();
  const initDay = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(
    -2,
  )} ${('0' + today.getHours()).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}`;
  return initDay;
};
