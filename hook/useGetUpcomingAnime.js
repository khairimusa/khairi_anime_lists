import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetUpcomingAnime = () => {
  const fetchUpcomingAnimes = async ({ pageParam = 1 }) => {
    const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
      params: {
        page: pageParam,
        limit: 7,
        status: "upcoming",
      },
    });
    return data.data;
  };

  return useInfiniteQuery({
    queryKey: ["fetchUpcomingAnimes"],
    queryFn: fetchUpcomingAnimes,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
};

export default useGetUpcomingAnime;
