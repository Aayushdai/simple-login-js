# simple-login-js

This project is built purely for practice and learning purposes.

It demonstrates how authentication and performance optimization work in a Node.js application using Express, Sequelize, MySQL, and Redis.

## Project Highlights

This project focuses on understanding and implementing four important backend concepts:

- **Redis:** An in-memory data store used for storing session information and cached data.
- **Caching:** Storing frequently accessed data temporarily to reduce repeated database queries and improve API response times.
- **Sessions:** Maintaining authenticated user information across multiple HTTP requests.
- **Cookies:** Storing the session identifier in the browser so it can be sent automatically with subsequent requests.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- MySQL
- Sequelize ORM
- Redis
- bcrypt
- express-session
- connect-redis

## Key Features

- User registration
- User login and logout
- Password hashing using bcrypt
- Session-based authentication
- Cookie-based session identification
- Redis session storage
- Redis caching for API responses
- Protected routes using authentication middleware
- Cache expiration (TTL)
- Cache invalidation

## System Architecture

The application uses the following architecture:

```text
                 CLIENT
                   |
                   v
             EXPRESS SERVER
                   |
          +--------+--------+
          |                 |
          v                 v
       MySQL              Redis
          |                 |
          v                 +----------------+
      User Data              |                |
                             v                v
                         Sessions          Cache
                             |
                             v
                       Session ID
                             |
                             v
                          COOKIE
                             |
                             v
                          BROWSER
```

## Learning Objectives

By building this project, I aim to understand:

1. How HTTP cookies work between browsers and servers.
2. How server-side sessions maintain user authentication.
3. How Redis stores and retrieves session data.
4. How caching reduces unnecessary database queries.
5. The difference between application memory, Redis, and MySQL.
6. How to integrate Redis with a Node.js and Express application.
7. How to manage cache expiration and invalidation.

## Project Purpose

The primary goal of this project is to understand how Redis, caching, sessions, and cookies work together in real-world backend applications.

This is a learning project, and the implementation will be developed step by step while exploring each concept.