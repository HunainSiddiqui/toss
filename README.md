# tanX-Backend-Assignment-price-alert

This application allows users to set price alerts for cryptocurrencies. When the target price is achieved, the user receives an email notification. The application is built using Javascript,NodeJS,REDIS and WebSocket for real-time price updates.
##### Assignmnet Submitted By: Mohammad Hunain Siddiqui(21BCE10211), VIT, Bhopal
## Getting Started

### Prerequisites
- Docker 

### Steps to Run

1. Ensure Docker is installed on your system. If not, download and install it from [Docker](https://www.docker.com/products/docker-desktop).

2. Open a terminal and run the following command to build and start the application:
   ```bash
   docker-compose up -d --build
   ```
3.Access the endpoint at:
```http://localhost:4000```

### Endpoints
Once a user signs up or logs into the system, the following functionalities are implemented:
#### There are following things implemented using JWT token. 
1. REST API endpoint for the user’s to create an alert `/api/alerts/create/`
2. REST API endpoint for the user’s to delete an alert `/alerts/delete/:id`
3. REST API endpoint to fetch all the alerts that the user has `/api/alerts`.

### 1. User Signup
- **Endpoint:** `api/signup`
- **Method:** `POST`
- **Description:** Allows a user to sign up by providing a username, password, and email in the request body.

### 2. User Login
- **Endpoint:** `api/login`
- **Method:** `POST`
- **Description:** Allows a user to log in by providing a username and password in the request body. Returns an access token for authenticated requests and Store it in a cookie.

### 3. Create/Update Alert
- **Endpoint:** `api/alerts/create`
- **Method:** `POST`
- **Authorization:** Bearer Token (JWT)
- **Description:** Creates or updates an alert for a user. Requires a valid JWT token. The request body should contain information about the coin and target price.

### 4. Delete Alert (Mark as Deleted)
- **Endpoint:** `/alerts/delete/:id`
- **Method:** `DELETE`
- **Authorization:** Bearer Token (JWT)
- **Description:** Marks an alert as deleted. Requires a valid JWT token and the ID of the alert to be deleted.


### 5. Get User Alerts
- **Endpoint:** `/alerts`
- **Method:** `GET`
- **Authorization:** Bearer Token (JWT)
- **Description:** Fetches alerts for the authenticated user. Supports pagination and optional status filtering.

# API Documentation
These apis were successfully tested using postman during development process. The database model dump file is uploaded for successfull composing of docker inorder to run this project.
## Endpoints

### 1. User Signup

- **Endpoint:** `/api/signup`
- **Method:** `POST`
- **Description:** Creates a new user account.
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "password": "secure_password",
    "email": "user@example.com"
  }

  ### Response:
  {
    "success": true,
    "user": {
        "name": "Abhishek",
        "email": "22002abhishek@gmail.com",
        "password": "$2a$10$xiEJrY.bCunjVXph49TSBuHUUFKbHrSov1qw7MWCZBNJ9xWkGRwcG",
        "_id": "66a5ee1617ed693d9e2cdde1",
        "createdAt": "2024-07-28T07:07:02.092Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTV************M2Q5ZTJjZGRlMSIsImlhdCI6MTcyMjE1MDQyMiwiZXhwIjoxNzIyNTgyNDIyfQ.wRpOmyDDsQw5gdNkl44eoclW1YNyHYwB6z3Kosh6eU4"
  }


### 2. User Login

- **Endpoint:** `/api/login`
- **Method:** `POST`
- **Description:** Authenticates and logs in a user.
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "password": "secure_password"
  }
  ### Response
  {
    "success": true,
    "user": {
        "_id": "66a51e563f2b6ed72138e4ae",
        "name": "Abhishek",
        "email": "272002abhishek@gmail.com",
        "password": "$2a$10$ljVRtC**klm/gxc9bFGpPECeoWhrPSqcr9uDxUqGt0hSf.svXMMwPIW",
        "createdAt": "2024-07-27T16:20:38.467Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTUxZTU8888**********jXmgBjKIR8s6sQtWk"
  }


### 3. Create/Update Alert

- **Endpoint:** `/alerts/create`
- **Method:** `POST`
- **Authorization:** Bearer Token (JWT)
- **Description:** Creates or updates an alert for a specific cryptocurrency.
- **Request Body:**
  ```json
  {
   
    "userId":"66a50b47a389f65fab1dcd41",
    "coin":"BTC",
    "targetPrice":"68910"

  }
  Response:
  {
    "success": true,
    "alert": {
        "userId": "66a51e563f2b6ed72138e4ae",
        "coin": "BTC",
        "targetPrice": 68910,
        "status": "created",
        "_id": "66a5ee7217ed693d9e2cdde5",
        "createdAt": "2024-07-28T07:08:34.061Z",
        "__v": 0
    }
  }

### 5. Delete Alert

- **Endpoint:** `/alerts/delete/real/<int:alert_id>`
- **Method:** `DELETE`
- **Authorization:** Bearer Token (JWT)
- **Description:** Deletes an alert from the database.
- **Response:**
  ```json
  {
    "message": "Alert deleted successfully"
  }


### 6. Get User Alerts

- **Endpoint:** `/alerts`
- **Method:** `GET`
- **Authorization:** Bearer Token (JWT)
- **Description:** Fetches user alerts with optional filtering and pagination.
- **Query Parameters:**
  - `page`: Current page number (default: 1)
  - `per_page`: Alerts per page (default: 10)
  - `status`: Filter alerts by status (optional)
- **Response:**
  ```json
  {
    "success": true,
    "alerts": [
        {
            "_id": "66a51e653f2b6ed72138e4b2",
            "userId": "66a51e563f2b6ed72138e4ae",
            "coin": "BTC",
            "targetPrice": 68780,
            "status": "triggered",
            "createdAt": "2024-07-27T16:20:53.145Z",
            "__v": 0,
            "triggeredAt": "2024-07-27T16:21:36.236Z"
        },
        {
            "_id": "66a51e733f2b6ed72138e4b5",
            "userId": "66a51e563f2b6ed72138e4ae",
            "coin": "BTC",
            "targetPrice": 68770,
            "status": "triggered",
            "createdAt": "2024-07-27T16:21:07.478Z",
            "__v": 0,
            "triggeredAt": "2024-07-27T16:21:39.004Z"
        },
        {
            "_id": "66a51e783f2b6ed72138e4b8",
            "userId": "66a51e563f2b6ed72138e4ae",
            "coin": "BTC",
            "targetPrice": 68740,
            "status": "triggered",
            "createdAt": "2024-07-27T16:21:12.514Z",
            "__v": 0,
            "triggeredAt": "2024-07-27T16:21:31.917Z"
        }
    ]
  }




## Web Socket

### 1. Coin Price WebSocket
- **URL:** `wss://stream.binance.com/ws`
- **Description:** WebSocket connection for real-time updates on cryptocurrency prices. Used internally for triggering alerts when the target price is reached.

## Sending Alerts

When the WebSocket receives real-time price updates for cryptocurrencies, it checks if the current price satisfies the target conditions set by users in their alerts. If a match is found, the alert is triggered, and the notification system is initiated.
## Solution for getting price alerts
1. We use the WebSocket Client library to connect to binance web socket  
2. We use the binance web socket to get the real time price updates for the cryptocurrencies.
3. This publist the price to redis client and through a channel "price_updates"

## WebSocket
    1. Coin Price WebSocket
    URL: wss://stream.binance.com/ws
    Description: WebSocket connection for real-time updates on cryptocurrency prices. Used internally for triggering alerts when the target price is reached.
    Sending Alerts
    When the WebSocket receives real-time price updates for cryptocurrencies, it checks if the current price satisfies the target conditions set by users in their alerts. If a match is found, the alert is triggered, and the notification system is initiated.

## Architecture Overview
    The application uses a microservices architecture with separate services for handling WebSocket connections, managing alerts, and processing background tasks. These services communicate through Redis using a publish-subscribe (pub-sub) pattern.

## Components
## WebSocket Server:

    Connects to Binance WebSocket to receive real-time price updates.
    Publishes price updates to the price_updates Redis channel.
    Main Backend:

    Provides REST API endpoints for creating, deleting, and fetching alerts.
    Saves alerts in MongoDB.
    Listens for new alert creation and publishes alerts to the new_alert Redis channel.
    Worker Backend:

    Subscribes to the price_updates Redis channel to receive real-time price updates.
    Subscribes to the new_alert Redis channel to receive new alert information.
    Checks if the price update satisfies any alert conditions.
    Changes the status of the alert from "created" to "triggered".
    Sends an email notification to the user.
    Deletes the alert after sending the email.

### Notification Workflow

1. **WebSocket Handling:**
   // Example WebSocket setup
      ```const WebSocket = require('ws');
      const ws = new WebSocket('wss://stream.binance.com/ws/btcusdt@kline_1m');

      ws.on('message', function incoming(data) {
        const priceUpdate = JSON.parse(data);
        redisClient.publish('price_updates', JSON.stringify(priceUpdate));
      });
      ```

2. **Alert Matching:**
   ```
        exports.createAlert = catchAsyncErrors(async (req, res, next) => {
      const { coin, target_price, email } = req.body;

      const alert = await Alert.create({
        coin,
        target_price,
        email,
        status: 'created'
      });

      redisClient.publish('new_alert', JSON.stringify(alert));

      res.status(201).json({
        success: true,
        alert
      });
    });

   ```

4. **WORKFLOW:**
      ```
          exports.createAlert = catchAsyncErrors(async (req, res, next) => {
            const { coin, target_price, email } = req.body;

            const alert = await Alert.create({
              coin,
              target_price,
              email,
              status: 'created'
            });

            redisClient.publish('new_alert', JSON.stringify(alert));

            res.status(201).json({
              success: true,
              alert
            });
          });

      ```

5. **Email Notification:**
   - The system sends an email notification to the identified user, informing them that their specified coin has reached the target price.
   - The email contains a message thanking the user and providing details about the triggered alert.
   -Sending email notifications in on_message function:
   ```
              
          const mailOptions = {
            from: 'jqCC31QxRZH2rjqRf6',
            to: user.email,
            subject: `Price Alert: ${coin} has reached ${alert.targetPrice}`,
            text: `The price of ${coin} has reached ${alert.targetPrice}. Current price is ${price}.`,
          };



          console.log('Sending email to:', user.email);

          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
              await Alert.findByIdAndUpdate(alert._id, { status: 'deleted' });
            }
          });

   ```


## User Table

The `User` table is responsible for storing user information.

### User Attributes

- `id`: Integer, Primary Key
- `username`: String (50 characters), Unique, Not Null
- `password`: String (50 characters), Not Null
- `email`: String (100 characters), Not Null

## Alert Table

The `Alert` table manages cryptocurrency alerts set by users.

### Alert Attributes

- `id`: Integer, Primary Key
- `user_id`: Integer, Foreign Key (references User.id), Not Null
- `coin`: String (10 characters), Not Null
- `target_price`: Float, Not Null
- `status`: String (20 characters), Default: 'created' , 'Triggered', 'Deleted'

The `status` field denotes the current state of the alert, with potential values including 'created,' 'deleted,' or 'triggered.'

The `user_id` field establishes a foreign key relationship with the `id` field in the `User` table, connecting each alert to a specific user.


## Contribution 
-Mohammad Hunain Siddiqui is responsible for completion of the assignmnet. The assignment was completed as per the provided guidelines by tanX.
