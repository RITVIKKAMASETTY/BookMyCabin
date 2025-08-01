import { useQuery } from '@tanstack/react-query'
import React from 'react'
import {getStaysTodayActivity} from "../../services/apiBookings";
export default function useTodayActivity() {
    const {isPending,data:activities}=useQuery({
        queryKey: ["today-activity"],
        queryFn: getStaysTodayActivity,
    })
  return (
    {isPending,activities}
  )
}
