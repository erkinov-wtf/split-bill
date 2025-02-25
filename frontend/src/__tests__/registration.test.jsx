import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Registration from "../pages/registration/index.jsx";

test("onboarding", () => {
    render(
        <BrowserRouter>
            <Registration />
        </BrowserRouter>
    );

});
