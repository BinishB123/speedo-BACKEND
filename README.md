# speedo-BACKEND
# Speedo

## Overview
Speedo is a backend application designed with a modular architecture. It follows best practices for scalability and maintainability, utilizing various components such as controllers, models, services, and middleware. The project is built using **Node.js** with **Express.js** as the web framework, and **MongoDB** as the database. It also integrates **JWT authentication** for security and uses **dotenv** for environment variable management.

## Vehicle Travel Details Calculation
### Key Concepts
#### Coordinates / Lat-Long
A vehicle's location is represented using latitude and longitude at a particular time, recorded by the GPS device installed in the vehicle.

#### GPS Data
In addition to location information, GPS devices also record the vehicle’s details such as ignition status, current speed, etc.

#### Distance Calculation
To calculate the distance traveled, two consecutive coordinates are used. If you have multiple coordinates (C1, C2, and C3), the total distance is calculated by summing up the distances between C1 → C2 and C2 → C3. You can use the `geolib` library to perform this calculation:
```javascript
const geolib = require('geolib');
const distance = geolib.getDistance(
  { latitude: prevLatLong.latitude, longitude: prevLatLong.longitude },
  { latitude: entry.latitude, longitude: entry.longitude }
);
```

#### Trip
A trip refers to the recorded journey of a vehicle from the starting point to the destination, encompassing all GPS data collected throughout the trip.

#### Stoppage
When the vehicle's ignition is turned **OFF**, it is considered a stoppage. The duration between the ignition turning **OFF** and the next ignition **ON** is counted as stoppage time.

#### Idling
When the vehicle's ignition is **ON** but the vehicle is not moving (speed = 0), the idling state starts. The idling state stops when the speed becomes greater than 0 again.

## Project Structure
```
Speedo/
│── constants/      # Contains constant values used across the application
│── controller/     # Handles incoming requests and responses
│── helper/         # Utility functions and reusable logic
│── middleware/     # Middleware functions for request processing
│── model/          # Defines database models
│── node_modules/   # Dependencies installed via npm
│── repository/     # Handles data access and persistence
│── router/         # Defines API routes
│── service/        # Business logic layer
│── .env            # Environment variables
│── .gitignore      # Specifies files to ignore in version control
│── index.js        # Entry point of the application
│── package.json    # Project dependencies and scripts
│── package-lock.json # Lock file for dependencies
│── README.md       # Project documentation
```

## Installation

   ```
. Navigate to the project directory:
   ```sh
   cd speedo
   ```
. Install dependencies:
   ```sh
   npm install
   ```

## Usage
1. Start the application:
   ```sh
   npm start
   ```
2. Run in development mode:
   ```sh
   npm run dev
   ```

## Environment Variables
Ensure you have a `.env` file in the root directory with the required environment variables. Example:
```env
PORT=5000
DATABASE_URL= yours
JWT_SECRET=your_secret_key
```



## Tech Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication mechanism
- **dotenv** - Environment variable management
- **geolib** - Library for distance calculations



