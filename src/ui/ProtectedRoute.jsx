// ProtectedRoute component determines if it renders the child routes or forces user to a specific page - All routes will only be accessible to logged in users

import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1) Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2) if no authenticated user, redirect to login page
  // Only allowed to call useNavigate inside some other function like a callback so use useEffect hook to get round this to call useNavigate hook.
  // Must also be placed before or outside of nested blocks - e.g. if checks
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3) While loading, show spinner
  if (isLoading)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );

  // 4) if user is authenticated, render app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
