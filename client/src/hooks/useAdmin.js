import { useQuery } from "@tanstack/react-query";
import { checkAdmin } from "../api/user.api";


const useAdmin = (email) => {
  return useQuery({
    queryKey: ["admin", email],
    queryFn: async () => {
      const res = await checkAdmin(email);
      return res.data;
    },
    enabled: !!email,
  });
};

export default useAdmin;
