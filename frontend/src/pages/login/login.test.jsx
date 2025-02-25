import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./index.jsx";

test("renders login form with username and password fields", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});
