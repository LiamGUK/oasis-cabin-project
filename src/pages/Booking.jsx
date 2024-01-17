import BookingDetail from "../features/bookings/BookingDetail";

function Booking() {
  // Ensure no side effects or data logic is added to pages components to leave them clean and leave all logic to be handled in the features folder group only. Pages components to simply return another component.
  return <BookingDetail />;
}

export default Booking;
