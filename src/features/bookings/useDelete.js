import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { act } from "react";
import { useNavigate } from "react-router-dom";
export default function useDeleteBooking() {
  const queryClient = useQueryClient();
const navigate=useNavigate();
  const {
    mutate: deleteBooking,         // ← What the component will call
    isPending: isDeleting,         // ← Status flag
  } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),   // ← Call the API, not itself!
    onSuccess: () => {
      toast.success("Booking deleted");
      queryClient.invalidateQueries({ queryKey: ["bookings"],exact: false});
      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message || "Could not delete booking"),
  });
  return { deleteBooking, isDeleting };
}
