import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UpdateUserStatus from "../pages/update-user-status/index.jsx";

test("renders join-room page", () => {
    render(
        <BrowserRouter>
            <UpdateUserStatus />
        </BrowserRouter>
    );

});