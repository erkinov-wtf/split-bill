import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ParticipantsPage from "../pages/participants-page/index.jsx";

test("participants", () => {
    render(
        <BrowserRouter>
            < ParticipantsPage/>
        </BrowserRouter>
    );

});