import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetCompletedAnimes = () => {
  const fetchCompletedAnimes = async ({ pageParam = 1 }) => {
    const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
      params: {
        page: pageParam,
        limit: 7,
        status: "complete",
      },
    });
    return data.data;
  };

  return useInfiniteQuery({
    queryKey: ["fetchCompletedAnimes"],
    queryFn: fetchCompletedAnimes,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
};

export default useGetCompletedAnimes;
