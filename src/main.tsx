import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { IN_ARTIFACT } from "./lib/claude";
import { App } from "./App";
import "./index.css";

// claude.ai ichida service worker ishlamaydi — faqat o'z saytimizda yoqamiz.
if (!IN_ARTIFACT && location.protocol === "https:") {
  registerSW({ immediate: true });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
