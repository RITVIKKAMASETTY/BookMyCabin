import React from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting } from '../../services/apiSettings';
export default function useEditSettings() {
    const queryClient = useQueryClient();
    const {mutate:editsettingss,isPending:isediting}= useMutation({
        mutationFn:updateSetting,
        onSuccess:()=>{toast.success("settings updated");queryClient.invalidateQueries({queryKey:['settings']});},
        onError:(err)=>toast.error(err.message)
      })
  return (
  {editsettingss,isediting}
  )
}
