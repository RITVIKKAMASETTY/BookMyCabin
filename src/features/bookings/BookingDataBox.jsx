import styled from "styled-components";
import { format, isToday, isValid, parseISO } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import Flag from "../../ui/Flag";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.$isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.$isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function BookingDataBox({ booking }) {
  const {
    created_at,
    startdate,
    enddate,
    numnights,
    numguests,
    cabinprice,
    extraprice,
    totalprice,
    hasbreakfast,
    observation,
    ispaid,
    guests,
    cabins,
  } = booking;

  const parsedStart = parseISO(startdate || "");
  const parsedEnd = parseISO(enddate || "");
  const parsedCreated = parseISO(created_at || "");

  const startDateStr = isValid(parsedStart)
    ? `${format(parsedStart, "EEE, MMM dd yyyy")} (${isToday(parsedStart) ? "Today" : formatDistanceFromNow(parsedStart)})`
    : "Invalid start date";

  const endDateStr = isValid(parsedEnd)
    ? format(parsedEnd, "EEE, MMM dd yyyy")
    : "Invalid end date";

  const createdAtStr = isValid(parsedCreated)
    ? format(parsedCreated, "EEE, MMM dd yyyy, p")
    : "Invalid booking date";

  const guestName = guests?.fullname || "Unknown Guest";
  const email = guests?.email || "No Email";
  const country = guests?.nationality || "Unknown";
  const countryFlag = guests?.countryflag;
  const nationalID = guests?.nationalid || "N/A";
  const cabinName = cabins?.name || "Unknown Cabin";

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numnights} night{numnights > 1 ? "s" : ""} in Cabin <span>{cabinName}</span>
          </p>
        </div>
        <p>
          {startDateStr} &mdash; {endDateStr}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numguests > 1 ? `+ ${numguests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {observation && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observation}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasbreakfast ? "Yes" : "No"}
        </DataItem>

        <Price $isPaid={ispaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalprice)}
            {hasbreakfast &&
              ` (${formatCurrency(cabinprice)} cabin + ${formatCurrency(
                extraprice
              )} breakfast)`}
          </DataItem>

          <p>{ispaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {createdAtStr}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
