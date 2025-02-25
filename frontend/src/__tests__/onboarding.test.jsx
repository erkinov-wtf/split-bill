
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Onboarding from "../pages/onboarding/index.jsx";

test("onboarding", () => {
    render(
        <BrowserRouter>
        < Onboarding />
</BrowserRouter>
);

});
