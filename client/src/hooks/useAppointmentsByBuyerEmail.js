import { useQuery } from "@tanstack/react-query";
import { fetchAppointmentsByUserEmail } from "../api/appointment.api";

const useAppointmentsByBuyerEmail = (email) => {
    return useQuery({
        queryKey: ["appointments", email],
        queryFn: async () => {
            const res = await fetchAppointmentsByUserEmail(email);
            return res.data;
        },
        enabled: !!email,
    });
};
export default useAppointmentsByBuyerEmail;