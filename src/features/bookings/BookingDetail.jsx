import styled from "styled-components";
import useBooking from "./useBooking";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import {useCheckout} from "../check-in-out/useCheckout";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi2";
import useDelete from "./useDelete";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {isPending:isdeleting,deleteBooking}=useDelete();
  const {checkout,isCheckout}=useCheckout();
  const {booking,isPending} =useBooking();
  const moveBack = useMoveBack();
  const navigate=useNavigate();
if(isPending||isdeleting) return <Spinner/>
if(!booking) return <Empty resourceName="bookings"/>
  const {id, status, guests, numNights, totalPrice } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && <Button variation="primary" onClick={()=>navigate(`/checkin/${id}`)}>Check in booking #{id}</Button>}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === "checked-in" && <Button disabled={isCheckout}icon={<HiArrowUpOnSquare/>} onClick={() =>checkout({bookingId:id})}>check out</Button>}
 <Modal>
        <Modal.Open opens="delete">
  <Button variation="danger" icon={<HiTrash/>} >delete</Button>
</Modal.Open>
      <Modal.Window name="delete">
        <ConfirmDelete resourceName="booking" disabled={isdeleting} onConfirm={() => deleteBooking(id)} onCloseModal={() => navigate(-1)} />
      </Modal.Window>
      </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
