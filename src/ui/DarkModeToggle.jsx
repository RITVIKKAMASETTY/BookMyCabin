import React from 'react'
import ButtonIcon from './ButtonIcon'
import {HiOutlineMoon,HiOutlineSun} from "react-icons/hi2";
import { DarkmodeProvider,useDarkMode } from '../context/Darkmodecontext';
export default function DarkModeToggle() {
    const {darkmode,toggleDarkmode}=useDarkMode();
  return (
  <ButtonIcon>
    {darkmode?<HiOutlineSun onClick={toggleDarkmode}/>:<HiOutlineMoon onClick={toggleDarkmode}/>}
  </ButtonIcon>
  )
}
