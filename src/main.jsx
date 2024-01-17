import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ErrorBounday component from react-error-boundary library prevents non rendered components due to errors - will auto load a fall back component if any component fails to load due to internal bugs in application - pass in component to load using the FallbackComponent prop */}
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      // Use the window object to redirect user back to homepage as will need to re load application anyway to restore app state
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
