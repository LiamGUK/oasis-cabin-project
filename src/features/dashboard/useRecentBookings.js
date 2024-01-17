import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [selectParams] = useSearchParams();

  const numDays = !selectParams.get("last")
    ? 7 // Will default to a value of 7 days if no searchParam value detected
    : Number(selectParams.get("last"));

  // Calculate date based on numDays variable above against today's date
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
