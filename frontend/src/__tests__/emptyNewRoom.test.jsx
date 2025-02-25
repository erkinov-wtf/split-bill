import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EmptyRoomPage from "../pages/empty-new-room/index.jsx";

test("rendering empty new room ", () => {
    render(
        <BrowserRouter>
            <EmptyRoomPage />
        </BrowserRouter>
    );

    expect(screen.getByText(/room id:/i)).toBeInTheDocument();
    expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Start tracking your group expenses by creating your first one/i)).toBeInTheDocument();
    expect(screen.getByText(/Create New Expense/i)).toBeInTheDocument();
});