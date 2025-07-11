# Pass Guard Backend API Documentation

This document describes the available API endpoints for the Pass Guard backend server. All endpoints are prefixed with the base URL:

```
http://localhost:3000/
```

---

## Authentication & User Endpoints

### Register a New User

- **URL:** `/user/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "your_password"
  }
  ```
- **Success Response:**
  - **Status:** `201 Created`
  - **Body:**
    ```json
    { "message": "Registered successfully" }
    ```
- **Error Responses:**
  - `400 Bad Request` – Invalid fullname or password length
  - `409 Conflict` – Email already registered
  - `500 Internal Server Error` – Server error

---

### Login

- **URL:** `/user/sign-in`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "your_password"
  }
  ```
- **Success Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    { "message": "Logged in successfully" }
    ```
  - **Cookies:** Sets `accessToken` (HTTP-only)
- **Error Responses:**
  - `400 Bad Request` – Missing fields
  - `404 Not Found` – Invalid email or password

---

### Logout

- **URL:** `/user/logout`
- **Method:** `GET`
- **Headers:**
  - Cookie: `accessToken=<token>` or `Authorization: Bearer <token>`
- **Success Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    { "message": "Logged out successfully." }
    ```
- **Error Responses:**
  - `401 Unauthorized` – No token provided
  - `500 Internal Server Error` – Server error

---

### Get User Profile

- **URL:** `/user/profile`
- **Method:** `GET`
- **Headers:**
  - Cookie: `accessToken=<token>` or `Authorization: Bearer <token>`
- **Success Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "_id": "user_id",
      "fullname": "John Doe",
      "email": "john@example.com",
      "voult": [ /* ... */ ]
    }
    ```
- **Error Responses:**
  - `404 Not Found` – Profile not found

---

## Password Vault Endpoints

### Get All Passwords

- **URL:** `/password/my-passwords`
- **Method:** `GET`
- **Headers:**
  - Cookie: `accessToken=<token>` or `Authorization: Bearer <token>`
- **Success Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    [
      {
        "_id": "password_id",
        "site": "example.com",
        "username": "user123",
        "password": "decrypted_password",
        "userId": "user_id",
        "iv": "iv_string"
      }
    ]
    ```
- **Error Responses:**
  - `401 Unauthorized` – Invalid or missing token
  - `404 Not Found` – Error fetching passwords

---

### Add (Save) a Password

- **URL:** `/password/save`
- **Method:** `POST`
- **Headers:**
  - Cookie: `accessToken=<token>` or `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "site": "example.com",
    "username": "user123",
    "password": "your_password"
  }
  ```
- **Success Response:**
  - **Status:** `201 Created`
  - **Body:**
    ```json
    { "message": "Password saved" }
    ```
- **Error Responses:**
  - `400 Bad Request` – Missing required fields
  - `401 Unauthorized` – Invalid or missing token
  - `500 Internal Server Error` – Server error

---

### Delete a Password

- **URL:** `/password/delete/:id`
- **Method:** `GET`
- **Headers:**
  - Cookie: `accessToken=<token>` or `Authorization: Bearer <token>`
- **Success Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    { "message": "Password deleted." }
    ```
- **Error Responses:**
  - `403 Forbidden` – Not allowed to delete this password
  - `404 Not Found` – Id not found
  - `401 Unauthorized` – Invalid or missing token
  - `500 Internal Server Error` – Server error

---

### Update a Password

- **URL:** `/password/update/:id`
- **Method:** `POST`
- **Headers:**
  - Cookie: `accessToken=<token>` or `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "site": "example.com",
    "username": "user123",
    "password": "new_password"
  }
  ```
- **Success Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    { "message": "Password updated" }
    ```
- **Error Responses:**
  - `400 Bad Request` – Missing required fields
  - `403 Forbidden` – Not allowed to update this password
  - `404 Not Found` – Password id not found
  - `401 Unauthorized` – Invalid or missing token
  - `500 Internal Server Error` – Server error

---

## Environment Variables

The following environment variables are required to run the backend server:

- `PORT` – Port for the server (default: 3000)
- `DB_URI` – MongoDB connection URI (e.g., `mongodb://localhost:27017`)
- `DB_NAME` – MongoDB database name (e.g., `passguard`)
- `JWT_SECRET_KEY` – Secret key for signing JWT tokens
- `SECRET_ENCRYPTION_KEY` – 32-byte (64 hex chars) key for AES-256-CBC encryption

## Additional Notes
- All timestamps (createdAt, updatedAt) are included in API responses for user and password records.
- The `/password/my-passwords` endpoint returns all passwords for the authenticated user, decrypted before sending.
- Passwords are encrypted using AES-256-CBC with a key from `SECRET_ENCRYPTION_KEY`.
- The backend uses HTTP-only cookies for authentication by default, but also supports Bearer tokens in the `Authorization` header.
- Database connection and encryption will fail if required environment variables are missing or invalid.

---

For more details, see the source code.
