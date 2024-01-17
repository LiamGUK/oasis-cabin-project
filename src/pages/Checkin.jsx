import CheckinBooking from "../features/check-in-out/CheckinBooking";

function Checkin() {
  // Ensure no side effects or data logic is added to pages components to leave them clean and leave all logic to be handled in the features folder group only. Pages components to simply return another component.
  return <CheckinBooking />;
}

export default Checkin;
