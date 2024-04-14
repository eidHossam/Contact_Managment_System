# Backend API Documentation for Contact Management System

## Introduction

This documentation provides an overview of the backend API for a Contact Management System built using Node.js, Express.js, and MySQL. The API allows users to register, login, manage contacts, and retrieve current user information.

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. Users must register then login to obtain an access token, which is then used to access protected endpoints.

## Available endpoints

### Register User

-   **Endpoint:** `POST /users/register`
-   **Description:** Registers a new user.
-   **Access:** Public
-   **Request Body:**
    ```json
    {
        "username": "example_user",
        "email": "user@example.com",
        "password": "password"
    }
    ```
-   **Response:**
    -   Status: 201 Created
    -   Body:
        ```json
        {
            "message": "Registration successful",
            "result": { "insertId": <user_id>, "affectedRows": 1 },
            "data": {
                "username": "example_user",
                "email": "user@example.com"
            }
        }
        ```

### Login User

-   **Endpoint:** `POST /users/login`
-   **Description:** Logs in an existing user.
-   **Access:** Public
-   **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "password"
    }
    ```
-   **Response:**
    -   Status: 200 OK
    -   Body:
        ```json
        {
            "message": "Login Successful",
            "accessToken": "<JWT_access_token>"
        }
        ```

### Get Current User

-   **Endpoint:** `GET /users/current`
-   **Description:** Retrieves information about the current logged-in user.
-   **Access:** Private (Requires valid access token)
-   **Response:**
    -   Status: 200 OK
    -   Body:
        ```json
        {
            "user": {
                "username": "example_user",
                "user_id": <user_id>
            }
        }
        ```

## Contacts

Endpoints for managing contacts of the logged-in user.

### Get All Contacts

-   **Endpoint:** `GET /contacts`
-   **Description:** Retrieves all contacts of the current user.
-   **Access:** Private (Requires valid access token)
-   **Response:**
    -   Status: 200 OK
    -   Body:
        ```json
        {
            "message": "Sending all contacts of user: <user_id>",
            "data": [ { "contact1": { ... } }, { "contact2": { ... } }, ... ]
        }
        ```

### Create Contact

-   **Endpoint:** `POST /contacts`
-   **Description:** Creates a new contact for the current user.
-   **Access:** Private (Requires valid access token)
-   **Request Body:**
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "phoneNumber": "123-456-7890"
    }
    ```
-   **Response:**
    -   Status: 201 Created
    -   Body:
        ```json
        {
            "message": "Created a contact",
            "contact": { "name": "John Doe", "email": "john@example.com", "phoneNumber": "123-456-7890" },
            "result": { "insertId": <contact_id>, "affectedRows": 1 }
        }
        ```

### Get Contact by ID

-   **Endpoint:** `GET /contacts/:id`
-   **Description:** Retrieves a specific contact by its ID.
-   **Access:** Private (Requires valid access token)
-   **Response:**
    -   Status: 200 OK
    -   Body:
        ```json
        {
            "message": "Sending contact with id: <contact_id>",
            "contact": {
                "name": "John Doe",
                "email": "john@example.com",
                "phoneNumber": "123-456-7890"
            }
        }
        ```

### Update Contact

-   **Endpoint:** `PUT /contacts/:id`
-   **Description:** Updates an existing contact.
-   **Access:** Private (Requires valid access token)
-   **Request Body:**
    ```json
    {
        "name": "Updated Name",
        "email": "updated@example.com",
        "phoneNumber": "987-654-3210"
    }
    ```
-   **Response:**
    -   Status: 200 OK
    -   Body:
        ```json
        {
            "message": "Updating contact with id: <contact_id>",
            "result": { "affectedRows": 1 }
        }
        ```

### Delete Contact

-   **Endpoint:** `DELETE /contacts/:id`
-   **Description:** Deletes a contact.
-   **Access:** Private (Requires valid access token)
-   **Response:**
    -   Status: 200 OK
    -   Body:
        ```json
        {
            "message": "Deleted contact with id: <contact_id>",
            "result": { "affectedRows": 1 }
        }
        ```

## Error Handling

The API returns appropriate HTTP status codes and error messages for different scenarios. Common errors include validation errors, unauthorized access, not found, and server errors. Error messages provide detailed information about the encountered issue.

---

This documentation outlines the endpoints, request/response formats, and authentication mechanisms for the Contact Management System API. Developers can use this documentation to integrate the backend API with frontend or other systems.
