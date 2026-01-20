import { useQuery } from "@tanstack/react-query";
import { fetchProperties } from "../api/properties.api";

const useProperties = (filters = {}) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => fetchProperties(filters),
    select: (res) => res.data,
    keepPreviousData: true,
  });
};

export default useProperties;
