import React from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabinapi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
export default function useDeleteCabin() {
    const queryClient = useQueryClient();
    const {isPending:isDeleting,mutate:deleteCabin} = useMutation({
      mutationFn:(id)=> deleteCabinapi(id),
      onSuccess:()=>{toast.success("Cabin deleted");queryClient.invalidateQueries({queryKey:['cabins']})},
      onError:(err)=>toast.error(err.message)
    });
  return (
   {isDeleting,deleteCabin}
  )
}
