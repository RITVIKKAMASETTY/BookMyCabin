import styled from "styled-components";
import React,{useEffect} from 'react'
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
const Table2 = styled.div`
  border: 1px solid var(--color-grey-200);
  width:100%;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
export default function CabinTable() {
// const {isPending, data: cabins} = useQuery({
//   queryKey:['cabins'],
//   queryFn:getCabins,
// })
const {isPending,cabins}=useCabin();
const [searchParams, setSearchParams]=useSearchParams();
console.log(cabins)
useEffect(() => {
  if (!searchParams.has("discount")) {
    searchParams.set("discount", "all");
    setSearchParams(searchParams);
  }
}, [searchParams, setSearchParams]);
if(!cabins) return<Empty resourceName="cabins"/>
if(isPending) return <Spinner/>
const filtervalue=searchParams.get("discount") || "all";
console.log(filtervalue)
let filtercabins;
if(filtervalue==="all"){
  filtercabins=cabins;
}
if(filtervalue==="no-discount"){
  filtercabins=cabins.filter(cabin=>cabin.discount===0);
}
if(filtervalue==="with-discount"){
  filtercabins=cabins.filter(cabin=>cabin.discount>0);
}
const SortBy= searchParams.get("sortBy") || "";
if(SortBy==="name-asc"){
  filtercabins.sort((a,b)=>a.name.localeCompare(b.name));
}
if(SortBy==="name-desc"){
  filtercabins.sort((a,b)=>b.name.localeCompare(a.name));
}
if(SortBy==="regularprice-asc"){
  filtercabins.sort((a,b)=>a.regularPrice-b.regularPrice);
}
if(SortBy==="regularprice-desc"){
  filtercabins.sort((a,b)=>b.regularPrice-a.regularPrice);
}
if(SortBy==="maxcapacity-asc"){
  filtercabins.sort((a,b)=>a.maxCapacity-b.maxCapacity);
}
if(SortBy==="maxcapacity-desc"){
  filtercabins.sort((a,b)=>b.maxCapacity-a.maxCapacity);
}
  return (
    <Menus>
<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
  <Table.Header>
    <div></div>
    <div>Cabin</div>
    <div>Capacity</div>
    <div>Price</div>
    <div>Discount</div>
  </Table.Header>
  <Table.Body data={filtercabins} render={(cabin)=>(
    <CabinRow cabin={cabin} key={cabin.id}/>
  )}/>
</Table>
</Menus>
  )
}