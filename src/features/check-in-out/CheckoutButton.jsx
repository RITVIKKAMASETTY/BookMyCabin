import Button from "../../ui/Button";
import { useCheckout } from "../../features/check-in-out/useCheckout";
import Spinner from "../../ui/Spinner";
function CheckoutButton({ bookingId }) {
  const {isCheckout,checkout} = useCheckout();
  return (
    <Button variation="primary" size="small" onClick={() => checkout(bookingId)} disabled={isCheckout}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
