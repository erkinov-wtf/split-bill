import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateRoom from "../pages/create-room/index.jsx";

test("rendering create room ", () => {
    render(
        <BrowserRouter>
            <CreateRoom />
        </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Enter a descriptive name/i)).toBeInTheDocument();
    expect(screen.getByText(/Create a room to start collaborating with others. Use a clear name that participants will recognize./i)).toBeInTheDocument();
    expect(screen.getByText(/Create Room/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Done/i)).toBeInTheDocument();
});