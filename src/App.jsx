import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";

//  REACT QUERY - remote state manager
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

// React query - first need to create place where data is to be stored and cached - create new instance of QueryClient to initialize
const queryClient = new QueryClient({
  // Can pass in an object to override the default settings of React query
  defaultOptions: {
    queries: {
      // staleTime declares the amount of time in millie seconds to when the cached data becomes stale and needs to be re-fetched
      // staleTime: 60 * 1000, // 60 * 1000 = 1 minute
      staleTime: 0, // Setting to 0 will always leave React query cached data as being listed as 'Stale'
    },
  },
});

function App() {
  // To use React query fetched data add QueryClientProvider component and wrap around all components in App component and add a client prop and pass in variable storing the cached data
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        {/* To use React query dev tools in app add below component under React query provider component */}
        <ReactQueryDevtools initialIsOpen={false} />

        {/* GlobalStyles required as sibling to main component in App sheet */}
        <GlobalStyles />
        {/* React Router implementation for SPA component pages */}
        <BrowserRouter>
          <Routes>
            {/* Make AppLayout the main Route for all the main components in order to share style rules in child routes - no path prop required */}
            <Route
              element={
                // Wrap AppLayout component with the ProtectedRoute component so that all the child routes below become children of the ProtectedRoute - use to set conditions to determine if it renders the child components through the children prop (i.e. if user is logged in)
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* Index redirect so no slug path will auto redirect to dashboard component */}
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="login" element={<Login />} />
            {/* Fallback route - invalid url path */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        {/* Toaster notification component - added as sibling to main wrapped component in App component */}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
