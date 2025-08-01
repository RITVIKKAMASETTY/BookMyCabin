// import React from 'react'
// import { useQuery } from "@tanstack/react-query";
// import { getCabins } from "../../services/apiCabins";
// export default function useCabin() {
//     const {isPending, data: cabins} = useQuery({
//         queryKey:['cabins'],
//         queryFn:getCabins,
//       })
//   return (
//    {isPending,cabins}
//   )
// }
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export default function useCabin() {
  const { isPending, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isPending, cabins };
}
