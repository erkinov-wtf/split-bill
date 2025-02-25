import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Login from "../pages/login/index.jsx";

test("renders login form with username and password fields", () => {
    render(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome back!/i)).toBeInTheDocument();
    expect(screen.getByText(/username/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
    expect(screen.getByText(/or if you are new user, just register/i)).toBeInTheDocument();
});