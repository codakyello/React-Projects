import Button from "../../ui/Button";
import PropTypes from "prop-types";
import useCheckout from "./useCheckout";

CheckoutButton.propTypes = {
  bookingId: PropTypes.any,
};

function CheckoutButton({ bookingId }) {
  const { mutate: checkOut, isLoading: isCheckingOut } = useCheckout();
  return (
    <Button
      disabled={isCheckingOut}
      onClick={() => {
        const obj = {
          status: "checked-out",
        };
        checkOut({ id: bookingId, obj });
      }}
      variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
