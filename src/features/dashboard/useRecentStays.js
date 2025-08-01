// import { useQuery } from "@tanstack/react-query";
// import { getBookings,getStaysAfterDate } from "../../services/apiBookings";
// import { subDays } from "date-fns";
// import { useSearchParams } from "react-router-dom";
// export function useRecentStays(){
//     const [searchParams] = useSearchParams();
//     const numDays=!searchParams.get("last")?7:Number(searchParams.get("last"));
//     const queryDate=subDays(new Date(),numDays).toISOString();
//     const{isPending,data:stays}=useQuery({
//         queryFn:()=>getStaysAfterDate(queryDate),
//         queryKey:["bookings",`last-${numDays}`],
//     });
//     const confirmstays=stays?.filter(stay=>stay.status==="checked-in"||stay.status==="checked-out");
//     return {isPending,confirmstays,stays,numDays};
// }
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isPending, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate), // ✅ pass string not object
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmstays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isPending, confirmstays, stays, numDays };
}
