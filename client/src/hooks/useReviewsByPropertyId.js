import { useQuery } from "@tanstack/react-query";
import { fetchReviewsByPropertyId } from "../api/reviews.api";

const useReviewsByPropertyId = (propertyId) => {
  return useQuery({
    queryKey: ["reviews-by-propertyId", propertyId],
    queryFn: () => fetchReviewsByPropertyId(propertyId),
    select: (res) => res.data,
    enabled: !!propertyId,
  });
};
export default useReviewsByPropertyId;