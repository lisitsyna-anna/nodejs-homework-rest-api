# REST API - Backend Application

This is a backend application for a RESTful API built using Node.js, Express, Mongoose, Multer, and
SendGrid. The API allows users to register, log in, log out, perform file uploading with Multer,
send emails with SendGrid, and includes additional endpoints for user-related operations such as
retrieving the current user, updating the subscription, updating avatars, verifying email addresses,
and resending verification emails. It also provides endpoints for managing a collection of contacts.

## Getting Started

To get started with the backend application, follow these steps:

1. Clone the repository: `git clone https://github.com/lisitsyna-anna/nodejs-rest-api`
2. Install the dependencies: `npm install`
3. Set up the necessary environment variables in the .env file. Example you can find in .env.example
   file.
4. Start the server: `npm run start:dev`

## API Endpoints

The following endpoints are available:

### Authentication

1. `POST /api/auth/signup` - register a new user.

   - Request Body:

   ```
     {
        "email": "user's name",
        "password": "user's password"
     }
   ```

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

2. `POST /api/auth/login` - log in with existing credentials.

- Request Body:

  ```
   {
      "email": "user's name",
      "password": "user's password"
   }
  ```

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

3. `GET /api/auth/logout` - log out the authenticated user.

   - Request Headers: Authorization (string, required): Bearer token received upon login.
   - Response: Returns a status code - 204

### Email Verification:

1.  `GET /api/auth/verify/:verificationToken` - verify the user's email address using the provided
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

2.  `POST /api/auth/verify` - resend a verification email to the user's email address.

    - Request Body:

    ```
      { "email": "user's name"}
    ```

    - Response:

    ```
    {
        status: 'success',
        code: 200,
        message: 'Verification email sent',
    }
    ```

### User Operations

1. `GET /api/users/current` - get the details of the currently authenticated user.

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

2. `PATCH /api/users/` - update the subscription details of the currently authenticated user.

- Request Headers:
  - Authorization (string, required): Bearer token received upon login.
- Request Body:

  ```
  {
      "subscription": "starter" or "pro" or "business"
  }
  ```

- Response:

  ```
  {
      "status": "success",
      "code": 200,
      "data": {
          "result": {
              "_id": "user id from DB",
              "email":"user@email.com,
              "password": "user password",
              "subscription": "pro",
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODgxZjcxYzY2YmE1YzFjMDY5NWMwOCIsImlhdCI6MTY4NjY1MTI1MywiZXhwIjoxNjg2NjU0ODUzfQ.\_ia4vM9AVwSX6jPj3NSxi9_cIkEbhq2AM1jscUqgqBI",
              "avatarURL": "//www.gravatar.com/avatar/b107691a393ac887312681b2e0efe5cb",
              "verificationToken":null,
              "verify": true,
              }
          }
  }
  ```

3. `PATCH /api/users/avatars` - upload a new avatar for the currently authenticated user.

- Request Headers:

  - Authorization (string, required): Bearer token received upon login.

- Request Body (Content-Type: multipart/form-data):

  ```
  {
      "avatar": "file.jpeg"
  }
  ```

- Response:

  ```
      {
          "avatarURL": "avatars/64881f71c66ba5c1c0695c08_cat.jpeg"
      }
  ```

### Contact Operations

1.  `GET /api/contacts/` - get all contacts (requires authentication).

- Request Headers:

  - Authorization (string, required): Bearer token received upon login.

- Response:

  ```
      {
      "status": "succes",
      "code": 200,
      "data": {
          "result": [
              {
                  "_id": "user id from DB",
                  "name": "contact's name",
                  "phone": "contact's phone",
                  "favorite": false,
                  "owner": {
                      "_id": "user id from DB",
                      "email": "user@email.com",
                      "subscription": "pro"
                  },
              }
          ]
      }
      }
  ```

2.  `GET /api/contacts/:contactId` - get a specific contact by ID (requires authentication).

- Request Headers:

  - Authorization (string, required): Bearer token received upon login.

- Request Parameters: contactId (string, required)

- Response:

  ```
      {
          "status": "succes",
          "code": 200,
          "data": {
              "result": {
                  "_id": "conatct's id",
                  "name": "contact's name",
                  "phone": "conatct's phone",
                  "favorite": false,
                  "owner": "user id from DB",
              }
          }
      }
  ```

3.  `POST /api/contacts` - add a new contact (requires authentication).

- Request Headers:

  - Authorization (string, required): Bearer token received upon login.

- Request Body:

  ```
      {
          "name": "conatact's name",
          "phone": "contact's phone"
      }
  ```

- Response:

  ```
     {
         "status": "succes",
         "code": 201,
         "data": {
             "result": {
                 "name": "contact's name",
                 "phone": "contact's phone",
                 "favorite": false,
                 "owner": "user id from DB",
                 "_id": "contact's id from DB",
             }
         }
     }
  ```

4.  `PUT /api/contacts/:contactId` - update a contact by ID (requires authentication).

- Request Headers:

  - Authorization (string, required): Bearer token received upon login.

- Request Parameters: contactId (string, required)

- Request Body:

  ```
      {
          "name": "conatact's name",
          "phone": "contact's phone"
      }
  ```

- Response:

  ```
     {
         "status": "succes",
         "code": 201,
         "data": {
             "result": {
                 "name": "contact's name",
                 "phone": "contact's phone",
                 "favorite": false,
                 "owner": "user id from DB",
                 "_id": "contact's id from DB",
             }
         }
     }
  ```

5.  `PATCH /api/contacts/:contactId/favorite` - update the favorite status of a contact by ID
    (requires authentication).

- Request Headers:

  - Authorization (string, required): Bearer token received upon login.

- Request Parameters: contactId (string, required)

- Request Body:

  ```
      {
         "favorite": true or false
      }
  ```

- Response:

  ```
     {
         "status": "succes",
         "code": 201,
         "data": {
             "result": {
                 "name": "contact's name",
                 "phone": "contact's phone",
                 "favorite": true, (or false)
                 "owner": "user id from DB",
                 "_id": "contact's id from DB",
             }
         }
     }
  ```

6.  `DELETE /api/contacts/:contactId` - delete a contact by ID (requires authentication).

- Request Headers:

  - Authorization (string, required): Bearer token received upon login.

- Request Parameters: contactId (string, required)

- Response:

  ```
    {
            "status": "succes",
        "code": 200,
        "message": "contact deleted",

    }
  ```

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

## Contact Information

If you have any questions or feedback, please feel free to contact me:

- Email: [anna.lisicina9309@gmail.com](mailto:anna.lisicina9309@gmail.com)
- GitHub: [lisitsyna-anna](https://github.com/lisitsyna-anna)
