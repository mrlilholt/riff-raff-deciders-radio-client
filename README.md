# Riff Raff Deciders Radio

Welcome to the Riff Raff Deciders Radio project! This application is designed to provide a streaming radio experience with a focus on user engagement and mobile accessibility.

## Overview

Riff Raff Deciders Radio is a web-based radio station that allows users to listen to live streaming audio, authenticate their accounts, and enjoy a mobile-friendly interface. The application is built using React for the client-side and Node.js for the server-side.

## Features

- **Live Streaming**: Listen to your favorite radio shows and music streams.
- **User Authentication**: Users can register and log in to access personalized features.
- **Mobile Friendly**: The application is designed to be responsive and accessible on mobile devices.
- **Dynamic Layout**: The layout adjusts based on the device, ensuring a seamless experience.

## Project Structure

The project is organized into two main directories: `client` and `server`.

### Client

- **public/index.html**: The main HTML file for the client application.
- **src/components**: Contains React components for the application.
  - `RadioPlayer.jsx`: Handles audio playback functionality.
  - `UserAuth.jsx`: Manages user authentication.
  - `MobileLayout.jsx`: Provides a responsive layout for mobile devices.
- **src/App.jsx**: The main application component.
- **src/index.jsx**: Entry point for the React application.
- **src/styles/main.css**: CSS styles for the application.
- **package.json**: Configuration file for npm.

### Server

- **controllers/radioController.js**: Handles streaming audio and radio operations.
- **models/User.js**: Defines the user schema.
- **routes/api.js**: API routes for user authentication and streaming.
- **app.js**: Main entry point for the server application.
- **package.json**: Configuration file for npm on the server side.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:
   ```
   cd ../server
   npm install
   ```

4. Start the server:
   ```
   node app.js
   ```

5. Start the client application:
   ```
   cd ../client
   npm start
   ```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.