import { useQuery } from "@tanstack/react-query";
import { fetchPropertyByAgencyId } from "../api/properties.api";

const usePropertyByAgencyId = (agencyId) => {
  return useQuery({
    queryKey: ["agency-properties", agencyId],
    queryFn: () => fetchPropertyByAgencyId(agencyId),
    select: (res) => res.data,
    enabled: !!agencyId,
  });
};
export default usePropertyByAgencyId;