import {  useQuery } from "@tanstack/react-query"
import { fetchPropertyByEmail } from "../api/properties.api"

export const usePropertyByEmail=(email)=>{
    return useQuery({
        queryKey:["propertyByEmail",email],
        queryFn:()=>fetchPropertyByEmail(email),
        select:(res)=>res.data,
        enabled:!!email
    })

}