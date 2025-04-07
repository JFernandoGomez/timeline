import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import TimeLineContextProvider from "./data/TimeLineContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TimeLineContextProvider>
      <App />
    </TimeLineContextProvider>
  </StrictMode>
);
