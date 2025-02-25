import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RoomPage from "../pages/room-page/index.jsx";

test("renders RoomPage", () => {
    render(
        <BrowserRouter>
            <RoomPage />
        </BrowserRouter>
    );

});
