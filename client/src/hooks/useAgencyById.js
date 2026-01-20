import { useQuery } from "@tanstack/react-query";

import { fetchAgencyById } from "../api/agency.api";
const useAgencyById=(id) => {
  return useQuery({
    queryKey: ["agencies", id],
    queryFn: () => fetchAgencyById(id),
    select: (res) => res.data,
    enabled: !!id,
  });
};
export default useAgencyById;