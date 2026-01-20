import { useQuery } from "@tanstack/react-query"
import { fetchAllProperties } from "../api/properties.api"

const useAllProperties = () => {
    return useQuery({
        queryKey:["allProperties"],
        queryFn:fetchAllProperties,
        select:(res)=>res.data
    })
}
export default useAllProperties;