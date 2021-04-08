import { useQuery } from "react-query";

const { api } = window;

function usePass() {
  const { data } = useQuery("use-pass", () => api.getPass());
  return { pass: data?.pass };
}

export default usePass;
