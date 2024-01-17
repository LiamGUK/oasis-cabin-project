import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    // queryKey = pass in name of table created in DB to target it for updating (needs to be in an array)
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
}
