import React,{createContext,useEffect} from 'react';
import useLocaleStorageState from '../hooks/useLocalStorageState';
export const Darkmodecontext=createContext();
function DarkmodeProvider({children}) {
    const[darkmode,setdarkmode]=useLocaleStorageState(window.matchMedia("(prefers-color-scheme:dark)").matches,"darkmode");
    useEffect(function(){if(darkmode){document.documentElement.classList.add("dark-mode");document.documentElement.classList.remove("light-mode");}else{document.documentElement.classList.add("light-mode");document.documentElement.classList.remove("dark-mode");}},[darkmode])
        function toggleDarkmode(){
        setdarkmode((darkmode)=>!darkmode);
    }
  return (<Darkmodecontext.Provider value={{darkmode,toggleDarkmode}}>{children}</Darkmodecontext.Provider>)
}
function useDarkMode(){
    const context=React.useContext(Darkmodecontext);
    if(context===undefined){
        throw new Error("useDarkMode must be used within a DarkmodeProvider");
    }
    return context;
}
export {DarkmodeProvider,useDarkMode};