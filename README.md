# Customer Management API

A Node.js API for managing customer data with rate limiting and time-based restrictions.

## Prerequisites

- Node.js
- MongoDB
- npm

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/Anuj2906/mock_project_1
    cd mock_project_1
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file with your MongoDB connection string:
    ```
    MONGODB_URL=your_mongodb_connection_string
    ```

4. Start the server:
    ```sh
    nodemon server.js
    ```

## API Endpoints

### Save Customer Data

- **POST** `/db-save`
- Request Body:
    ```json
    {
        "customer_name": "bob",
        "dob": "2001-09-19",
        "monthly_income": "1200"
    }
    ```

### Time-Based Save

- **POST** `/time-based-api`
- Request Body:
    ```json
    {
        "customer_name": "alice",
        "dob": "2003-03-29",
        "monthly_income": "1500"
    }
    ```
- Restrictions: 
    - Not available on Mondays.
    - Not available from 8:00 AM to 3:00 PM daily.

### Search Customers by Age

- **GET** `/db-search`
- Request Body:
     ```json
    {
        "customer_name": "aditya"
    }
    ```
- Finds customers aged between 10 and 25.
- Response includes the time taken by the API.

## Rate limiting on all api endpoints: 
    - Max 1 request per 2 minutes per customer.
    - Max 2 requests per 5 minutes.
