# Split Bill - Project Documentation

## Overview

Split Bill is a web-based application that allows users to efficiently split expenses among group members. Users can create rooms, assign expenses to participants, and track payments. The system ensures fair expense distribution, providing an intuitive and simple user experience.

## Features

- **User Authentication**: Custom session-based authentication.

- **Room Management**: Users can create and join rooms.

- **Expense Tracking**: Room creators assign expenses, and users track their payments.

- **Expense Settlement**: Users can see outstanding amounts and update payment statuses.

- **Role-Based Permissions**: Room creators have exclusive control over expense modifications.


## Architecture & Tech Stack

### Monorepo Structure

The project follows a **monorepository** design, hosting both frontend and backend in a single Git repository for streamlined development and collaboration.

### Backend

- **Language**: C++

- **Framework**: UServer (for high-performance asynchronous requests)

- **Database**: PostgreSQL

- **Containerization**: Docker

- **API Design**: RESTful API


### Frontend

- **Language**: JavaScript

- **Framework**: React.js

- **CSS**: Tailwind CSS

- **Build Tool**: Vite

- **Data Fetching**: Fetch API (no state management library used)


## Database Schema

The database schema consists of key tables:

1. **Users**: Stores user information (ID, username, password, etc.).

2. **Rooms**: Manages expense groups (room name, creator ID, etc.).

3. **Expenses**: Tracks expenses assigned to users.

4. **User_Expenses**: Manages expense assignments and payment status.


## Authentication & Security

- Uses a **custom session-based authentication** system.

- After login, a **session ID** is returned.

- Every API request includes `X-Ya-User-Ticket` in the header to identify users.

- No OAuth or JWT yet, but planned in future versions.


## API Reference

### User Management

- `POST /login`: Logs in a user and returns a session ID.

- `POST /register`: Registers a new user.

- `GET /me`: Retrieves logged-in user info.


### Room Management

- `POST /v1/rooms`: Creates a new room.

- `POST /v1/rooms/join/:roomId`: Allows a user to join a room.

- `GET /v1/rooms`: Fetches all rooms.

- `GET /v1/rooms/:roomId`: Retrieves details of a specific room.


### Expense Management

- `POST /v1/products`: Creates an expense.

- `GET /v1/products`: Retrieves all expenses.

- `PUT /v1/products/bulk-update`: Updates multiple expenses.

- `DELETE /v1/products/:productId`: Deletes an expense.

- `POST /v1/user-products`: Assigns a user to an expense.

- `PUT /v1/user-products/:id`: Updates payment status.


## Deployment & DevOps

- **Deployment**: Docker-based, managed with `docker-compose`.

- **CI/CD**: Uses **GitHub Actions** for automated deployment.


## Future Roadmap

### Short-Term Enhancements

- Implement **JWT-based authentication** for better security.

- UI/UX improvements for better usability.

- Allow **room creators to remove users**.


### Long-Term Goals

- Introduce **real-time updates** via WebSockets.

- Implement **expense splitting algorithms** (percentage-based, equal split, etc.).

- Add **mobile-friendly support**.

- Enable **integration with payment gateways** for in-app settlements.


## Conclusion

Split Bill is a robust and scalable expense-sharing application. The future plans focus on improving security, user experience, and expanding features for seamless collaboration.