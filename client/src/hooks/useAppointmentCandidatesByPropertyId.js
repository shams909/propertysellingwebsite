import { useQuery } from "@tanstack/react-query";
import { fetchAppointmentCandidatesByPropertyId } from "../api/appointment.api";

const useAppointmentCandidatesByPropertyId = (propertyId) => {
  return useQuery({
    queryKey: ["appointment-candidates-by-propertyId", propertyId],
    queryFn: () => fetchAppointmentCandidatesByPropertyId(propertyId),
    select: (res) => res.data,
    enabled: !!propertyId,
  });
};
export default useAppointmentCandidatesByPropertyId;