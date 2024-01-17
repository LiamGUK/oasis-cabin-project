import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  // useParams = readonly hook - Grabs param value from URL to use in code
  const { bookingId } = useParams();

  // useQuery hook from react query allows to run an asynchronous operation and pull data into component here - used for GET requests from database
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    // queryKey = pass in name of table created in DB to target it for updating (needs to be in an array)
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    // retry = by default react query attempts 3 times to fetch data - setting to false will override this so will only attempt once if can't find any data
    retry: false,
  });

  return { isLoading, booking, error };
}
