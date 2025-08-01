import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
export default function useSettings() {
    const {isPending,error,data:settings}=useQuery({
        queryKey:['settings'],
        queryFn:getSettings
    })
  return (
    {isPending,error,settings}
  )
}
