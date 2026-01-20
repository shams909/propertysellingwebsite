import { useQuery } from "@tanstack/react-query";
import { fetchPropertyCountByPropertyId } from "../api/properties.api";



const usePropertyCountByPropertyId = (propertyId) => {
  return useQuery({
    queryKey: ["property-count-by-propertyId", propertyId],
    queryFn: () => fetchPropertyCountByPropertyId(propertyId),
    select: (res) => res.data?.count || 0,
    enabled: !!propertyId,
  });
};
export { usePropertyCountByPropertyId };