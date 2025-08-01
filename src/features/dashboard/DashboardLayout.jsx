import styled from "styled-components";
import React from "react";
import { useBookings } from "../bookings/useBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import useCabin from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
export default function DashboardLayout({ children }) {
  const {bookings,isPending}=useBookings();
  const {confirmstays,isPending:getstays,stays,numDays}=useRecentStays();
  const {cabins,isPending:getcabins}=useCabin();
  if(isPending||getstays||getcabins) return <Spinner/>
  console.log("confirmstays",confirmstays);
  console.log("stays",stays);
  console.log("cabins",cabins);
  console.log("numDays",numDays);
  console.log(bookings);
  return <StyledDashboardLayout><Stats bookings={bookings??[]} confirmstays={confirmstays??[]} numdays={numDays??6} cabinscount={cabins?.length??1}/><TodayActivity/><DurationChart confirmedStays={confirmstays??[]}/><SalesChart bookings={bookings??[]} numDays={numDays??7}/></StyledDashboardLayout>;
}