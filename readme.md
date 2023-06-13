# REST API - Backend Application

This is a backend application for a RESTful API built using Node.js, Express, Mongoose, Multer, and
SendGrid. The API allows users to register, log in, log out, perform file uploading with Multer,
send emails with SendGrid, and includes additional endpoints for user-related operations such as
retrieving the current user, updating the subscription, updating avatars, verifying email addresses,
and resending verification emails. It also provides endpoints for managing a collection of contacts.

## Getting Started

To get started with the backend application, follow these steps:

1. Clone the repository: git clone https://github.com/lisitsyna-anna/nodejs-rest-api
2. Install the dependencies: npm install
3. Set up the necessary environment variables in the .env file. Example you can find in .env.example
   file.
4. Start the server: npm run start:dev

## API Endpoints

The following endpoints are available:

### Authentication

1. POST /api/auth/signup - Register a new user.

   - Request Body:
   - email (string, required): User's email address.
   - password (string, required): User's password.
   - Response:

   ```
   {
    "status": "success",
    "code": 201,
    "data": {
        "user": {
            "email": "user@email.com",
            "subscription": "starter",
            "avatarURL": "//www.gravatar.com/avatar/b107691a393ac887312681b2e0efe5cb"
        }
    }
   }

   ```

2. POST /api/auth/login - Log in with existing credentials.

- Request Body:

  - email (string, required): User's email address.
  - password (string, required): User's password.

  - Response:

  ```
  {
    "status": "success",
    "code": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODgxZjcxYzY2YmE1YzFjMDY5NWMwOCIsImlhdCI6MTY4NjY1MDMzOCwiZXhwIjoxNjg2NjUzOTM4fQ.3QrCNr3hQBBtOOIm0wN-th-ShD44bMp3iwAbLwDWn_E",
        "user": {
            "email": "user@email.com",
            "subscription": "starter",
            "avatarURL": "//www.gravatar.com/avatar/b107691a393ac887312681b2e0efe5cb"
        }
    }
  }
  ```

3. GET /api/auth/logout - Log out the authenticated user.

   - Request Headers: Authorization (string, required): Bearer token received upon login.
   - Response: Returns a status code - 204

### Email Verification:

1.  GET /api/auth/verify/:verificationToken - Verify the user's email address using the provided
    verification token.

    - Request Parameters: verificationToken (string, required): Verification token received during
      sign-up.
    - Response:

```
    {
      status: 'success',
      code: 200,
      message: 'Verification successful',
      verify: true,
    }
```

2.  POST /api/auth/verify - Resend a verification email to the user's email address.

    - Request Body:

      - email (string, required): User's email address.

    - Response:

    ```
    {
        status: 'success',
        code: 200,
        message: 'Verification email sent',
    }
    ```

### User Operations

1.  GET /api/users/current - Get the details of the currently authenticated user.

    - Request Headers:

      - Authorization (string, required): Bearer token received upon login.

    - Response:

    ```
    {
        status: 'success',
        code: 200,
        data: {
            user: {
                email,
                subscription,
            },
        },
    }
    ```

2.  PATCH /api/users/ - Update the subscription details of the currently authenticated user.

    - Request Headers:
      - Authorization (string, required): Bearer token received upon login.
    - Request body:

      - subscription: 'starter' or 'pro' or 'business'

    - Response:

    ```
    {
     "status": "success",
     "code": 200,
     "data": {
         "result": {
             "_id": "user id from DB",
             "email": "user@email.com,
             "password": "user password",
             "subscription": "pro",
             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODgxZjcxYzY2YmE1YzFjMDY5NWMwOCIsImlhdCI6MTY4NjY1MTI1MywiZXhwIjoxNjg2NjU0ODUzfQ._ia4vM9AVwSX6jPj3NSxi9_cIkEbhq2AM1jscUqgqBI",
             "avatarURL": "//www.gravatar.com/avatar/b107691a393ac887312681b2e0efe5cb",
             "verificationToken": null,
             "verify": true,
             "createdAt": "created date",
             "updatedAt": "udated date"
         }
     }
    }
    ```

3.  PATCH /api/users/avatars - Upload a new avatar for the currently authenticated user.

    - Request Headers:
      - Authorization (string, required): Bearer token received upon login.
    - Request body (Content-Type: multipart/form-data):

      - avatar: 'file.jpeg'

    - Response:

    ```
        {
            "avatarURL": "avatars/64881f71c66ba5c1c0695c08_cat.jpeg"
        }
    ```

### Contact Operations

- GET /api/contacts/ - Get all contacts (requires authentication).
- GET /api/contacts/:contactId - Get a specific contact by ID (requires authentication).
- POST /api/contacts - Add a new contact (requires authentication).
- PUT /api/contacts/:contactId - Update a contact by ID (requires authentication).
- PATCH /api/contacts/:contactId/favorite - Update the favorite status of a contact by ID (requires
  authentication).
- DELETE /api/contacts/:contactId - Delete a contact by ID (requires authentication).

## Dependencies

The backend application uses the following dependencies:

- Express: Fast, unopinionated, minimalist web framework for Node.js.
- Mongoose: Elegant MongoDB object modeling for Node.js.
- Multer: Middleware for handling multipart/form-data, used for file uploads.
- SendGrid: Email sending service for transactional and marketing emails.
- Joi: Schema description language and data validator for JavaScript.
- bcryptjs: Library for hashing passwords.
- jsonwebtoken: JSON Web Token implementation for Node.js.
- dotenv: Loads environment variables from a .env file.

## Development Dependencies

- Nodemon: Development tool that automatically restarts the node application when file changes in
  the directory are detected.

## Environment Variables

Create a .env file in the root directory of the project and add the following environment variables:

- DB_HOST=<your-mongodb-connection-uri>
- PORT= <your-port>
- SECRET_KEY= <your-jwt-secret>
- SENDGRID_API_KEY= <your-sendgrid-api-key>
- BASE_URL= <your-base-url>

Make sure to replace <your-mongodb-connection-uri>, <your-jwt-secret>, <your-sendgrid-api-key>,
<your-base-url>, and <your-port> with your actual values.
