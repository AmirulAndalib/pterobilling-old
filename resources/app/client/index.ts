import React from "react";
import ReactDOMClient from "react-dom/client";

import App from "./App";

const container = document.getElementById("root");

if (container) {
    const root = ReactDOMClient.createRoot(container);
    root.render(React.createElement(App));
} else {
    console.error("Unable to find container #root");
}
