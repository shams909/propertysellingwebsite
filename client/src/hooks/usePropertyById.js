import { useQuery } from "@tanstack/react-query";
import { fetchPropertyById } from "../api/properties.api";

const usePropertyById = (id) => {
  return useQuery({
    queryKey: ["properties", id],
    queryFn: () => fetchPropertyById(id),
    select: (res) => res.data,
    enabled: !!id,
  });
};

export default usePropertyById;
