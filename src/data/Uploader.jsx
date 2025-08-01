// import { useState } from "react";
// import { isFuture, isPast, isToday } from "date-fns";
// import supabase from "../services/supabase";
// import Button from "../ui/Button";
// import { subtractDates } from "../utils/helpers";

// import { bookings } from "./data-bookings";
// import { cabins } from "./data-cabins";
// import { guests } from "./data-guests";

// // const originalSettings = {
// //   minBookingLength: 3,
// //   maxBookingLength: 30,
// //   maxGuestsPerBooking: 10,
// //   breakfastPrice: 15,
// // };

// async function deleteGuests() {
//   const { error } = await supabase.from("guests").delete().gt("id", 0);
//   if (error) console.log(error.message);
// }

// async function deleteCabins() {
//   const { error } = await supabase.from("cabins").delete().gt("id", 0);
//   if (error) console.log(error.message);
// }

// async function deleteBookings() {
//   const { error } = await supabase.from("bookings").delete().gt("id", 0);
//   if (error) console.log(error.message);
// }

// async function createGuests() {
//   const { error } = await supabase.from("guests").insert(guests);
//   if (error) console.log(error.message);
// }

// async function createCabins() {
//   const { error } = await supabase.from("cabins").insert(cabins);
//   if (error) console.log(error.message);
// }

// async function createBookings() {
//   // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
//   const { data: guestsIds } = await supabase
//     .from("guests")
//     .select("id")
//     .order("id");
//   const allGuestIds = guestsIds.map((cabin) => cabin.id);
//   const { data: cabinsIds } = await supabase
//     .from("cabins")
//     .select("id")
//     .order("id");
//   const allCabinIds = cabinsIds.map((cabin) => cabin.id);

//   const finalBookings = bookings.map((booking) => {
//     // Here relying on the order of cabins, as they don't have and ID yet
//     const cabin = cabins.at(booking.cabinId - 1);
//     const numnights = subtractDates(booking.enddate, booking.startdate);
//     const cabinPrice = numnights * (cabin.regularprice - cabin.discount);
//     const extrasPrice = booking.hasbreakfast
//       ? numnights * 15 * booking.numguests
//       : 0; // hardcoded breakfast price
//     const totalPrice = cabinPrice + extrasPrice;

//     let status;
//     if (
//       isPast(new Date(booking.endDate)) &&
//       !isToday(new Date(booking.endDate))
//     )
//       status = "checked-out";
//     if (
//       isFuture(new Date(booking.startDate)) ||
//       isToday(new Date(booking.startDate))
//     )
//       status = "unconfirmed";
//     if (
//       (isFuture(new Date(booking.endDate)) ||
//         isToday(new Date(booking.endDate))) &&
//       isPast(new Date(booking.startDate)) &&
//       !isToday(new Date(booking.startDate))
//     )
//       status = "checked-in";

//     return {
//       ...booking,
//       numNights,
//       cabinPrice,
//       extrasPrice,
//       totalPrice,
//       guestId: allGuestIds.at(booking.guestId - 1),
//       cabinId: allCabinIds.at(booking.cabinId - 1),
//       status,
//     };
//   });

//   console.log(finalBookings);

//   const { error } = await supabase.from("bookings").insert(finalBookings);
//   if (error) console.log(error.message);
// }

// function Uploader() {
//   const [isLoading, setIsLoading] = useState(false);

//   async function uploadAll() {
//     setIsLoading(true);
//     // Bookings need to be deleted FIRST
//     await deleteBookings();
//     await deleteGuests();
//     await deleteCabins();

//     // Bookings need to be created LAST
//     await createGuests();
//     await createCabins();
//     await createBookings();

//     setIsLoading(false);
//   }

//   async function uploadBookings() {
//     setIsLoading(true);
//     await deleteBookings();
//     await createBookings();
//     setIsLoading(false);
//   }

//   return (
//     <div
//       style={{
//         marginTop: "auto",
//         backgroundColor: "#e0e7ff",
//         padding: "8px",
//         borderRadius: "5px",
//         textAlign: "center",
//         display: "flex",
//         flexDirection: "column",
//         gap: "8px",
//       }}
//     >
//       <h3>SAMPLE DATA</h3>

//       <Button onClick={uploadAll} disabled={isLoading}>
//         Upload ALL
//       </Button>

//       <Button onClick={uploadBookings} disabled={isLoading}>
//         Upload bookings ONLY
//       </Button>
//     </div>
//   );
// }

// export default Uploader;
import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// -----------------------------------------------------------------------------
// DELETE EXISTING ROWS
// -----------------------------------------------------------------------------
async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.error("deleteGuests:", error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.error("deleteCabins:", error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.error("deleteBookings:", error.message);
}

// -----------------------------------------------------------------------------
// CREATE GUESTS & CABINS
// -----------------------------------------------------------------------------
async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.error("createGuests:", error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.error("createCabins:", error.message);
}

// -----------------------------------------------------------------------------
// CREATE BOOKINGS (WITH CORRECT SNAKE_CASE COLUMN NAMES)
// -----------------------------------------------------------------------------
async function createBookings() {
  // 1. fetch real guest IDs and cabin IDs
  const { data: guestRows, error: guestsError } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  if (guestsError) return console.error("fetch guest IDs:", guestsError);

  const { data: cabinRows, error: cabinsError } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  if (cabinsError) return console.error("fetch cabin IDs:", cabinsError);

  const allGuestIds = guestRows.map((r) => r.id);
  const allCabinIds = cabinRows.map((r) => r.id);

  // 2. build final payload, mapping JS → DB column names
  const finalBookings = bookings.map((b) => {
    // calculate nights, prices, status
    const numnights = subtractDates(b.enddate, b.startdate);
    const cabin = cabins.at(b.cabinid - 1);
    const cabinprice = numnights * (cabin.regularprice - cabin.discount);
    const extraprice = b.hasbreakfast
      ? numnights * 15 * b.numguests
      : 0;
    const totalprice = cabinprice + extraprice;

    let status;
    if (isPast(new Date(b.enddate)) && !isToday(new Date(b.enddate))) {
      status = "checked-out";
    } else if (isFuture(new Date(b.startdate)) || isToday(new Date(b.startdate))) {
      status = "unconfirmed";
    } else {
      status = "checked-in";
    }

    return {
      // your table columns, exact snake_case:
      created_at:  b.created_at,
      startdate:   b.startdate,
      enddate:     b.enddate,
      numnights:   numnights,
      numguests:   b.numguests,
      cabinprice:  cabinprice,
      extraprice:  extraprice,
      totalprice:  totalprice,
      status:      status,
      hasbreakfast: b.hasbreakfast,
      ispaid:      b.ispaid,
      observation: b.observation,
      cabinid:     allCabinIds.at(b.cabinid - 1),
      gustid:     allGuestIds.at(b.guetid - 1),
    };
  });

  console.log("Inserting bookings:", finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.error("createBookings:", error.message);
}

// -----------------------------------------------------------------------------
// Uploader Component
// -----------------------------------------------------------------------------
export default function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  // wipe & reload everything
  async function uploadAll() {
    setIsLoading(true);
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();
    await createGuests();
    await createCabins();
    await createBookings();
    setIsLoading(false);
  }

  // only bookings
  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>
      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>
      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}
