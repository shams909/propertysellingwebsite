import { useQuery } from "@tanstack/react-query";
import { fetchPropertyCountByAgency } from "../api/properties.api";

const usePropertyCountByAgency = (agencyId) => {
  return useQuery({
    queryKey: ["property-count-by-agency", agencyId],
    queryFn: () => fetchPropertyCountByAgency(agencyId),
    select: (res) => res.data?.count || 0,
    enabled: !!agencyId,
  });
};

export default usePropertyCountByAgency;
