import { useQuery } from "@tanstack/react-query";
import { fetchPropertyType } from "../api/properties.api";

const usePropertyTypes = () => {
  return useQuery({
    queryKey: ["property-types"],
    queryFn: () => fetchPropertyType(),
    select:(res)=>res.data
  });
};
export default usePropertyTypes;
