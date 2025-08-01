import React from 'react'
import Stat from './Stat'
import { HiOutlineBanknotes, HiOutlineBookOpen, HiOutlineCalendarDays,HiOutlineChartBar} from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers';
export default function Stats({bookings,confirmstays,numdays,cabinscount}) {
  const numBookings=bookings.length;
  const sales=bookings.reduce((total,booking)=>total+booking.totalPrice,0)||100;
  const numStays=confirmstays.length;
  const occupancyRate=confirmstays.reduce((total,stay)=>total+stay.numNights,0)/(numdays*cabinscount)||0;
  return (<><Stat title="bookings" color="blue" icon={<HiOutlineBookOpen/>} value={numBookings}/>
  <Stat title="sales" color="green" icon={<HiOutlineBanknotes/>} value={"₹"+sales}/>
  <Stat title="check ins" color="indigo" icon={<HiOutlineCalendarDays/>} value={numStays}/>
  <Stat title="occupancy rate" color="yellow" icon={<HiOutlineChartBar/>} value={Math.round(occupancyRate)*100+"%"}/></>
  )
}
