import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (endpoint) => {
  let baseUrl = "https://api.jikan.moe/v4/anime";

  if (endpoint) {
    baseUrl += `/${endpoint}`;
  }

  const { data } = await axios.get(baseUrl);

  return data.data;
};

const useFetch = (endpoint) => {
  return useQuery(["anime", endpoint], () => fetchData(endpoint));
};

export default useFetch;
