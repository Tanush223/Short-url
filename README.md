# Node.js Server with Secure Authentication and Short URL Functionality

This project is a Node.js server that provides secure authentication using JSON Web Tokens (JWT) and user validations. Additionally, it offers functionality to create short URLs. It utilizes the following libraries:

- **jsonwebtoken**: For user authentication and validation.
- **bcrypt**: For hashing passwords before storing them in the database.
- **mongodb**: Used as the database for storing user data and short URLs.
- **mongoose**: For defining user schemas and models.
- **zod**: For input validations on the server.

## API Routes

- **POST /user/signup**: Endpoint for user signup. Allows users to register with the system.
- **POST /user/signin**: Endpoint for user signin. Allows registered users to login to the system.
- **POST /url**: Endpoint for creating a short URL. Requires authentication.
- **GET /url/:surl**: Endpoint for accessing the original URL associated with a short URL. Requires authentication.

## Explanation

- After a user creates an account, they provide a URL to the server to get a Short URL.
- The server checks if the user is authorized using a JWT token. If the user is authorized,
- The server creates a random short ID, which we'll call it as short URL, and stores it in the database. The short URL is then sent back to the user.
- When a user wants to access a URL, they provide the short URL to the server through parameters.
- For example: `http://localhost:3000/url/69097`
- Here, `69097` is the short URL. The server receives the short URL and finds the corresponding original URL in the database.
- It then redirects the user to the original URL.


