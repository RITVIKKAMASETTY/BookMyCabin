// import styled from "styled-components";
// import BookingDataBox from "../../features/bookings/BookingDataBox";
// import useBooking from "../../features/bookings/useBooking";
// import Row from "../../ui/Row";
// import Heading from "../../ui/Heading";
// import ButtonGroup from "../../ui/ButtonGroup";
// import Button from "../../ui/Button";
// import ButtonText from "../../ui/ButtonText";
// import Spinner from "../../ui/Spinner";
// import { useMoveBack } from "../../hooks/useMoveBack";
// import { use, useState, useEffect } from "react";
// import Checkbox from "../../ui/Checkbox";
// import { useCheckin } from "../../features/check-in-out/useCheckin";
// import  useSettings from "../../features/settings/useSettings";
// const Box = styled.div`
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);
//   padding: 2.4rem 4rem;
// `;

// function CheckinBooking() {
//   const [confirmpaid,setconfirmpaid]=useState(false);
//   const [addBreakfast,setaddBreakfast]=useState(false);
//     const moveBack = useMoveBack();
//   const {checkin,isChecking}=useCheckin();
//   const { booking, isPending, error } = useBooking();
//   useEffect(() => {setconfirmpaid(booking?.ispaid??false)},[booking]
//   );
//   const {settings,isPending:isPendingSetting}=useSettings();
//   if (isPending||isPendingSetting) return <Spinner />;
//   if (error) return <p>Error: {error.message}</p>;
//   if (!booking) return <p>No booking found</p>;
//   const {
//     id: bookingId,
//     guests,
//     totalprice,
//     numguests,
//     hasbreakfast,
//     numnights,
//   } = booking;
//   const optionalBreakfastprice=settings?.breakfastprice*numnights*numguests;
//   function handleCheckin() {if(!confirmpaid)return; if(addBreakfast){checkin(bookingId,{breakfast:{hasbreakfast:true,extraprice:optionalBreakfastprice,totalprice:totalprice+optionalBreakfastprice ,}});}else{checkin({bookingId,breakfast:{}});}}
//   return (
//     <>
//       <Row type="horizontal">
//         <Heading as="h1">Check in booking #{bookingId}</Heading>
//         <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
//       </Row>
//       <BookingDataBox booking={booking} />
// {!hasbreakfast&&<Box>
//   <Checkbox id="breakfast" checked={addBreakfast} onChange={()=>{setaddBreakfast(breakfast=>!breakfast);setconfirmpaid(false)}}>want to add breakfast for ₹{optionalBreakfastprice}</Checkbox>
// </Box>}
// <Box>
//   <Checkbox disabled={confirmpaid||isChecking}checked={confirmpaid} onChange={(e)=>setconfirmpaid(confirm=>!confirm)}>I confirm that {guests?.fullname} has paid the total amount of {!addBreakfast?totalprice:totalprice+optionalBreakfastprice}{!addBreakfast?"":"("+totalprice+" + ₹"+optionalBreakfastprice+")"}{!addBreakfast?"":"(including breakfast)"}</Checkbox>
// </Box>
//       <ButtonGroup>
//         <Button disabled={!confirmpaid||isChecking}onClick={handleCheckin}>Check in booking #{bookingId}</Button>
//         <Button variation="secondary" onClick={moveBack}>
//           Back
//         </Button>
//       </ButtonGroup>
//     </>
//   );
// }

// export default CheckinBooking;
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import useBooking from "../../features/bookings/useBooking";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useState, useEffect } from "react";
import Checkbox from "../../ui/Checkbox";
import { useCheckin } from "../../features/check-in-out/useCheckin";
import useSettings from "../../features/settings/useSettings";
import { useMoveBack } from "../../hooks/useMoveBack";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmpaid, setconfirmpaid] = useState(false);
  const [addBreakfast, setaddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { checkin, isChecking } = useCheckin();
  const { booking, isPending, error } = useBooking();
  const { settings, isPending: isPendingSetting } = useSettings();

  useEffect(() => {
    if (booking) setconfirmpaid(booking?.ispaid ?? false);
  }, [booking]);

  if (isPending || isPendingSetting) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!booking) return <p>No booking found</p>;

  const {
    id: bookingId,
    guests,
    totalprice,
    numguests,
    hasbreakfast,
    numnights,
  } = booking;

  const optionalBreakfastprice =
    settings?.breakfastprice * numnights * numguests;

    function handleCheckin() {
      if (!confirmpaid) return;
    
      if (addBreakfast) {
        checkin({
          bookingId,
          data: {
            hasbreakfast: true,
            extraprice: optionalBreakfastprice,
            totalprice: totalprice + optionalBreakfastprice,
          },
        });
      } else {
        checkin({
          bookingId,
          data: {},
        });
      }
    }
    

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasbreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setaddBreakfast((prev) => !prev);
              setconfirmpaid(false);
            }}
          >
            Want to add breakfast for ₹{optionalBreakfastprice}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          disabled={confirmpaid || isChecking}
          checked={confirmpaid}
          onChange={() => setconfirmpaid((prev) => !prev)}
        >
          I confirm that {guests?.fullname} has paid the total amount of ₹
          {!addBreakfast
            ? totalprice
            : `${totalprice + optionalBreakfastprice} (${totalprice} + ₹${optionalBreakfastprice}) (including breakfast)`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmpaid || isChecking} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
