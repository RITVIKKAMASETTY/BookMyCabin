import styled from "styled-components";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiEye } from "react-icons/hi";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Spinner from "../../ui/Spinner";
import useDelete from "./useDelete";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const {
    id: bookingId,
    startdate,
    enddate,
    numnights,
    totalprice,
    status,
    guests,
    cabins,
  } = booking;

  const navigate = useNavigate();
  const guestName = guests?.fullname || "Unknown Guest";
  const email = guests?.email || "No Email";
  const cabinName = cabins?.name || "Unknown Cabin";

  const { isPending, deleteBooking } = useDelete();
  const { checkout, isCheckout } = useCheckout();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
    cancelled: "red",
  };

  if (isCheckout) return <Spinner />;

  const isValidDate = (dateStr) => {
    const date = new Date(dateStr);
    return dateStr && !isNaN(date);
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isValidDate(startdate)
            ? isToday(new Date(startdate))
              ? "Today"
              : formatDistanceFromNow(startdate)
            : "Unknown date"}{" "}
          &rarr; {numnights} night stay
        </span>
        <span>
          {isValidDate(startdate) && isValidDate(enddate)
            ? `${format(new Date(startdate), "MMM dd yyyy")} — ${format(
                new Date(enddate),
                "MMM dd yyyy"
              )}`
            : "Dates unavailable"}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status] || "gray"}>
        {status?.replace("-", " ") || "unknown"}
      </Tag>

      <Amount>{formatCurrency(totalprice)}</Amount>

      {/* Full Modal block with Open & Window inside */}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed"&& (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                disabled={isCheckout}
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout({ bookingId })}
              >
                Check out
              </Menus.Button>
            )}

            {/* 🔥 This will OPEN the modal named "delete" */}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        {/* 🔥 This is the modal CONTENT bound to name="delete" */}
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isPending}
            onConfirm={() => deleteBooking(bookingId)}
            onCloseModal={() => navigate(-1)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
