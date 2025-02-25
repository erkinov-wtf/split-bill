import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SuccessPage from "../pages/success-page/index.jsx";

test("renders login form with username and password fields", () => {
    render(
        <BrowserRouter>
        <SuccessPage />
</BrowserRouter>
);

    expect(screen.getByText(/You have successfully registered./i)).toBeInTheDocument();
    expect(screen.getByText(/congrats/i)).toBeInTheDocument();
    expect(screen.getByText(/Redirecting to login in 3 seconds.../i)).toBeInTheDocument();
});
