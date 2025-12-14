# Backend Instructions for SevaSamiti Platform

This document outlines the backend requirements to support the user authentication features implemented in the React frontend.

## 1. API Endpoints

You need to create the following REST API endpoints under the `/api/auth` path.

### 1.1. User Signup

-   **Endpoint:** `POST /api/auth/signup`
-   **Description:** Registers a new user in the system.
-   **Request Body (JSON):**
    ```json
    {
        "email": "user@example.com",
        "username": "newuser",
        "password": "a_strong_password"
    }
    ```
-   **Success Response (201 Created):**
    -   The response should indicate that the user was created successfully. It's recommended to return a JWT (JSON Web Token) to automatically log the user in.
    ```json
    {
        "token": "your_jwt_token_here",
        "message": "User registered successfully!"
    }
    ```
-   **Error Responses:**
    -   `400 Bad Request`: If the request body is invalid (e.g., missing fields, invalid email).
    -   `409 Conflict`: If the email or username already exists.

### 1.2. User Login

-   **Endpoint:** `POST /api/auth/login`
-   **Description:** Authenticates a user and returns a token.
-   **Request Body (JSON):**
    ```json
    {
        "username": "existinguser",
        "password": "user_password"
    }
    ```
-   **Success Response (200 OK):**
    -   Returns a JWT for the authenticated user.
    ```json
    {
        "token": "your_jwt_token_here"
    }
    ```
-   **Error Responses:**
    -   `400 Bad Request`: If the request body is invalid.
    -   `401 Unauthorized`: If the credentials are incorrect.

## 2. Google SSO (Social Sign-On)

Implementing Google SSO requires backend setup to handle the OAuth 2.0 flow.

### 2.1. Google Login Initiation

-   **Endpoint:** `GET /api/auth/google/login`
-   **Description:** This endpoint should redirect the user to Google's OAuth 2.0 consent screen. The frontend will open a new window or redirect to this URL.
-   **Action:** Your server will construct the Google OAuth URL with the necessary parameters (client ID, redirect URI, scope, etc.) and perform a 302 Redirect.

### 2.2. Google OAuth Callback

-   **Endpoint:** `GET /api/auth/google/callback`
-   **Description:** This is the `redirect_uri` you configured in your Google Cloud Platform project. Google will redirect the user here after they grant permission.
-   **Action:**
    1.  Your server receives the `code` and `state` from Google.
    2.  Exchange the `code` for an access token and an ID token by making a POST request to Google's token endpoint.
    3.  Decode the ID token to get the user's profile information (email, name, etc.).
    4.  Check if a user with this email already exists in your `Users` database.
        -   If the user exists, generate a JWT for them.
        -   If the user does not exist, create a new user account with the information from Google, then generate a JWT.
    5.  Return the JWT to the frontend. A common way to do this is to redirect the user to a specific frontend route (e.g., `/auth/success?token=...`) or render a simple HTML page with a script that saves the token in `localStorage` and closes the window.

## 3. Database Schema

-   The existing `Users` entity in `in.sevasamitit.sevasamiti_platform.entity.Users` should be sufficient.
-   Ensure the `password` field is securely hashed and salted before being stored. **Do not store plain text passwords.** Use a strong hashing algorithm like BCrypt.
-   You may need to add a field to link a user to their Google account ID (`googleId`) to handle account linking in the future.

## 4. Security

-   **JWT (JSON Web Token):** Use JWTs for session management. The token should be sent from the frontend in the `Authorization` header of subsequent requests (e.g., `Authorization: Bearer <token>`).
-   **CORS:** Configure CORS (Cross-Origin Resource Sharing) to allow requests from your frontend's domain (e.g., `http://localhost:3000` during development).
-   **Password Hashing:** As mentioned, use BCrypt or a similar strong hashing algorithm for passwords.

## Summary for `pom.xml`

You will likely need to add the following dependencies to your `pom.xml`:

1.  **Spring Security:** For authentication and authorization.
    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    ```
2.  **JWT Library (e.g., `jjwt`):** To create and parse JSON Web Tokens.
    ```xml
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
    ```
3.  **Spring OAuth2 Client:** To simplify the Google SSO integration.
    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-oauth2-client</artifactId>
    </dependency>
    ```

Start by implementing the standard email/password signup and login, and then proceed with the Google SSO integration.
