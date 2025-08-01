import React,{ useState }  from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createeditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
export default function useCreate() {
    const queryClient = useQueryClient();
    const {mutate:createcabin,isPending:isCreating}= useMutation({
        mutationFn:(data)=>createeditCabin(data),
        onSuccess:()=>{toast.success("Cabin created");queryClient.invalidateQueries({queryKey:['cabins']});},
        onError:(err)=>toast.error(err.message)
      })
  return (
    {isCreating,createcabin}
  )
}
