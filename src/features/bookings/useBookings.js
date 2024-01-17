import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

// Use React Query to make HTTP request to supabase DB
export function useBookings() {
  // React query hook for pre-fetching data - use to preload data to React query cache ready to use before executing
  const queryClient = useQueryClient();

  // Update/Store URL params as state
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page")
    ? // If no searchParam found in URL for page will default value to 1 (1st page)
      1
    : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    // Set default as an empty object as will be empty on initial load and can't destructure so just set to an empty object instead
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // useQuery hook requires data object name passed in an array under queryKey and the function name used to make HTTP request - getBookings from apiBookings sheet
    // Add filter object into queryKey array so it will auto fetch data when it detects the object changes
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // Prefetches the next page before rendering when clicking next button on pagination
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  // Prefetches the previous page if loaded from last pagination page and clicking previous button
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  // useQuery hook returns isLoading state object, data received from HTTP request and error object which can ben returned and used in app.
  return { isLoading, bookings, error, count };
}
