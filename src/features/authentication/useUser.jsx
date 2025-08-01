import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../services/auth'
export default function useUser() {
    const {isPending,data:user}=useQuery({
queryKey:["users"],
queryFn:getCurrentUser})
  return ({isPending,user,isAuthenticated:user?.role==="authenticated"})}
