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

