import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAiringAnimes = () => {
  const fetchAiringAnimes = async ({ pageParam = 1 }) => {
    const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
      params: {
        page: pageParam,
        limit: 7,
        status: "airing",
      },
    });
    return data.data;
  };

  return useInfiniteQuery({
    queryKey: ["fetchAiringAnimes"],
    queryFn: fetchAiringAnimes,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
};

export default useGetAiringAnimes;
