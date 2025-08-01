import {useEffect,useRef} from "react";
export default function useOutsideHook({handler,listencapturing=true}) {
    const ref=useRef();
    useEffect(function(){function handleclick(e){if(ref.current&&!ref.current.contains(e.target))handler()}document.addEventListener("click",handleclick,listencapturing);return()=>document.removeEventListener("click",handleclick);}, [handler,listencapturing]);return ref;
}