import React from 'react'
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout as logoutapi } from "../../services/auth";
import { useQueryClient } from "@tanstack/react-query";
export default function useLogout() {
    const navigate=useNavigate();
    const queryClient=useQueryClient();
    const {mutate:logout,isPending}=useMutation({
        mutationFn:logoutapi,
        onSuccess:()=>{queryClient.removeQueries();navigate("/login");navigate("/login",{replace:true});},
    })
  return (
    {logout,isPending}
  )
}
