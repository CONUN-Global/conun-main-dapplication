import { useQuery } from "react-query";

const { api } = window;

function useDbUser() {
  const { data, isLoading, refetch } = useQuery("use-get-db-user", () =>
    api.getCurrentUser()
  );
  return { user: data, isLoading, refetch };
}

export default useDbUser;
