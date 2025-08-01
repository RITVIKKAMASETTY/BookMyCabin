// import { useQuery } from "@tanstack/react-query";
// import { getBookings } from "../../services/apiBookings";
// import { subDays } from "date-fns";
// import { useSearchParams } from "react-router-dom";
// export function useRecentBookings(){
//     const [searchParams] = useSearchParams();
//     const numDays=!searchParams.get("last")?7:Number(searchParams.get("last"));
//     const queryDate=subDays(new Date(),numDays).toISOString();
//     const{isPending,data:bookings}=useQuery({
//         queryFn:()=>getBookings({startDate:queryDate}),
//         queryKey:["bookings",`last-${numDays}`],
//     });
//     return {isPending,bookings};
// }
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isPending, data } = useQuery({
    queryFn: () =>
      getBookings({
        filter: {
          field: "created_at",
          value: queryDate,
          method: "gte",
        },
      }),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isPending, bookings: data?.data ?? [], count: data?.count ?? 0 };
}
