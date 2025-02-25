import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import JoinRoom from "../pages/join-room/index.jsx";
test("renders join-room page", () => {
    render(
        <BrowserRouter>
        < JoinRoom/>
</BrowserRouter>
);
    expect(screen.getByText(/ROOM ID/i)).toBeInTheDocument();
});
