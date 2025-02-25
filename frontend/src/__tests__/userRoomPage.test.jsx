import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UsersRoomPage from "../pages/all-users-rooms/index.jsx";

test("rendering users room page", () => {
    render(
        <BrowserRouter>
            <UsersRoomPage rooms={[]} />
        </BrowserRouter>
    );

    expect(screen.getByText(/Rooms/i)).toBeInTheDocument();
});