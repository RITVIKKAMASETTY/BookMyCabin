// import { updateBooking } from "../../services/apiBookings";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useQueryClient } from "@tanstack/react-query";
// export function useCheckin() {
//     const navigate = useNavigate();
//     const queryClient=useQueryClient();
//   const { mutate: checkin, isPending: isChecking } = useMutation({
//     mutationFn: ({bookingId,breakfast}) =>
//       updateBooking(bookingId, { status: "checked-in", ispaid: true,...breakfast,}),
//     onSuccess: (data) => {
//       toast.success(`Booking #${data.id} successfully checked in`);
//       queryClient.invalidateQueries({active:true });
//       navigate("/");},onError: (error) => {toast.error(error.message);},});return { checkin, isChecking };}
import { updateBooking } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: checkin, isPending: isChecking } = useMutation({
    mutationFn: ({ bookingId, data }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        ispaid: true,
        ...data,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkin, isChecking };
}

