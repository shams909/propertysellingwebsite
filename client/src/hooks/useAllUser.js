import { useQuery } from "@tanstack/react-query";
import { fetchAllUser } from "../api/user.api";


const useAllUser = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: fetchAllUser, // ✅ clean & correct
    select:(res)=>res.data

  });
};

export default useAllUser;
