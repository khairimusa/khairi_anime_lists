import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (id) => {
  let baseUrl = "https://api.jikan.moe/v4/anime";
  const { data } = await axios.get(`${baseUrl}/${id}`);
  return data.data;
};

const useFetch = (endpoint) => {
  return useQuery(["anime", endpoint], () => fetchData(endpoint));
};

export default useFetch;
