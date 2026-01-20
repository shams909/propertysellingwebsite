import { useQuery } from "@tanstack/react-query";
import { fetchAgencies } from "../api/agency.api";

const useAgencies = () => {
  return useQuery({
    queryKey: ["agencies"],
    queryFn: fetchAgencies, // ✅ clean & correct
    select:(res)=>res.data

  });
};

export default useAgencies;
