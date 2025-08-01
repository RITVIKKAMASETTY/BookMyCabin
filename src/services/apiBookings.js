import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constatnts";
export async function getBookings({filter,sortBy,page}) {
 let query=supabase.from("bookings").select("id,created_at,startdate,enddate,numnights,numguests,status,totalprice,cabins(name),guests(fullname,email)",{count:"exact"});
   if(filter!==null){
    console.log("filter",filter);
    query=query[filter.method||"eq"](filter.field,filter.value);
   }
   if(sortBy){
    console.log("sortBy",sortBy);
    query=query.order(sortBy.field,{ascending:sortBy.direction==="asc"});
   }
   if(page){
    console.log("page",page);
    const from=(page-1)*PAGE_SIZE;
    const to=from+PAGE_SIZE-1;
    query=query.range(from,to);
   }
  const { data, error, count } = await query;
   console.log("data",data)
  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }
  console.log("data",data)
  return {data,count};
}
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalprice, extrasprice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// // Returns all STAYS that are were created after the given date
// export async function getStaysAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     // .select('*')
//     .select("*, guests(fullname)")
//     .gte("startdate", date)
//     .lte("startdate", getToday());

//   if (error) {
//     console.error(error.message);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }
export async function getStaysAfterDate(date) {
  // Ensure date is a properly formatted string
  const formattedDate =
    typeof date === "string" ? date : date.toISOString().split("T")[0];

  const endDate = getToday(); // Make sure this returns a "YYYY-MM-DD" string
  const formattedEndDate =
    typeof endDate === "string" ? endDate : endDate.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullname)")
    .gte("startdate", formattedDate)
    .lte("startdate", formattedEndDate);

  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}
// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullname, nationality, countryflag)")
    .or(
      `and(status.eq.unconfirmed,startdate.eq.${getToday()}),and(status.eq.checked-in,enddate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
