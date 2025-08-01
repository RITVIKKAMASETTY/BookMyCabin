import React from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createeditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from '../../services/auth';
export default function useUpdateUser() {
    const queryClient = useQueryClient();
    const {mutate:updateuser,isPending:isupdating}= useMutation({
        mutationFn:updateCurrentUser,
        onSuccess:({user})=>{toast.success("user acoount updated");queryClient.invalidateQueries({queryKey:['users']});},
        onError:(err)=>toast.error(err.message)
      })
  return{updateuser,isupdating}
}
