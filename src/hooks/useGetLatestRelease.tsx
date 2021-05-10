import axios from "axios";
import { useQuery } from "react-query";

function useGetLatestRelease() {
  const { data } = useQuery("get-latest-release", async () => {
    const { data } = await axios(
      "https://api.github.com/repos/CONUN-Global/conun-main-dapplication/releases/latest"
    );
    return data;
  });

  return {
    latestVersion: data?.name,
  };
}

export default useGetLatestRelease;
