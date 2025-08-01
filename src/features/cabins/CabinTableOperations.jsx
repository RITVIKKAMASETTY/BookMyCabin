import React from 'react'
import TableOpenrations from "../../ui/TableOperations"
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
export default function CabinTableOperations() {
  return (
    <TableOpenrations>
        <Filter filterfield={"discount"} options={[{value:"all",label:"All"},{value:"no-discount",label:"No-discount"},{value:"with-discount",label:"With discount"}]}/>
        <SortBy options={[{value:'name-asc',label:'sort by name(a-z)'},{value:'name-desc',label:'sort by name(z-a)'},{value:'regularprice-asc',label:'sort by price(low to high)'},{value:'regularprice-desc',label:'sort by price(high to low)'},{value:'maxcapacity-asc',label:'sort by capacity(low to high)'},{value:'maxcapacity-desc',label:'sort by capacity(high to low)'}]}/>
    </TableOpenrations>
  )
}
