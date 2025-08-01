import styled, { css } from "styled-components";
import React,{useEffect} from 'react'
import { useSearchParams } from "react-router-dom";
const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
export default function Filter({filterfield,options}) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleclick(value){
    const newParams = new URLSearchParams(searchParams);
    newParams.set(filterfield, value);
    if(searchParams.get('page')) searchParams('page',1);
    setSearchParams(newParams);
  }
  return (
    <StyledFilter>
      {options.map((option)=>(<FilterButton key={option.value} disabled={searchParams.get(filterfield)===option.value} $active={searchParams.get(filterfield)===option.value} onClick={()=>handleclick(option.value)}>{option.label}</FilterButton>))}
    </StyledFilter>
  )
}
