import React,{useEffect} from 'react'
import useUser from '../features/authentication/useUser';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const FullPage=styled.div`
height:100vh;
background-color:var(--color-grey-50);
display:flex;
align-items:center;
justify-content:center;
`
export default function ProtectedRoute({children}) {
const navigate=useNavigate();
const {isPending,isAuthenticated}=useUser();
useEffect(()=>{if(!isAuthenticated&&!isPending)navigate("/login");},[isAuthenticated,isPending,navigate]) 
if(isPending)return<FullPage><Spinner/></FullPage>
if(isAuthenticated)
  return (
children
  )
}
