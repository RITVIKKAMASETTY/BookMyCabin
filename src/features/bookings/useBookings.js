import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../utils/constatnts";
export function useBookings() {
    const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filtervalue = searchParams.get("status");
  const filter = !filtervalue || filtervalue === "all"
    ? null
    : { field: "status", value: filtervalue, method: "eq" };

  const sortbyraw = searchParams.get("sortBy") || "startDate-desc";
  let [field, direction] = sortbyraw.split("-");
  field = field.toLowerCase();
  const sortBy = { field, direction };
  const page=!searchParams.get("page")?1:Number(searchParams.get("page"));
  const {
    isPending,
    data,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy,page],
    queryFn: () => getBookings({ filter, sortBy,page }),
  });

  // 🔒 Safe destructuring with fallback defaults
  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;
  const pagecount=Math.ceil(count/PAGE_SIZE);
  if(page<pagecount)
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy,page+1],
    queryFn: () => getBookings({ filter, sortBy,page:page+1 }),
  });
  if(page>1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy,page-1],
      queryFn: () => getBookings({ filter, sortBy,page:page-1 }),
    });
  return { isPending, error, bookings, count };
}
