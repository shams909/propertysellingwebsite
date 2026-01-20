import { useQuery } from "@tanstack/react-query";
import { getFavourites } from "../api/properties.api";


const useFavourites = (email) => {
  return useQuery({
    queryKey: ["favourites", email],
    queryFn: async () => {
      const res = await getFavourites(email);
      return res.data;
    },
    enabled: !!email,
  });
};

export default useFavourites;
