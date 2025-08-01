import React from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createeditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
export default function useEdit() {
    const queryClient = useQueryClient();
    const {mutate:editcabin,isPending:isEditing}= useMutation({
        mutationFn:({data,editId})=>createeditCabin(data,editId),
        onSuccess:()=>{toast.success("Cabin updated");queryClient.invalidateQueries({queryKey:['cabins']});},
        onError:(err)=>toast.error(err.message)
      })
  return (
  {editcabin,isEditing}
  )
}
