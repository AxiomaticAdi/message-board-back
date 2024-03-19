# Message Board Backend

Welcome to the Message Board Backend repository! This repository contains the backend code for the Message Board project, responsible for managing data storage, retrieval, and communication with the frontend.

[![Live Preview](https://img.shields.io/badge/Live%20Preview-Visit%20Website-blue?style=for-the-badge&logo=github)](https://axiomaticadi.github.io/message-board-front/)

## Project Overview

The Message Board project is a full-stack application designed to create an interactive message board platform. It consists of two separate repositories:

1. **Frontend** ([link to frontend repository](https://github.com/AxiomaticAdi/message-board-front)): Manages the user interface and client-side functionality. Users can write messages, submit them, and view all historical messages.

2. **Backend** (this repository): Handles server-side logic, data storage, retrieval, and communication with the database. It provides the necessary endpoints for the frontend to fetch and submit messages.

The communication between the frontend and backend is facilitated through HTTP requests, with the backend serving as the API provider for the frontend.

## Stack Used

The Message Board project backend utilizes the following stack:

- **Express.js**: A minimalist and flexible Node.js web application framework that handles server-side logic, routing, middleware, and communication with the database.

- **Firebase Realtime Database**: A cloud-hosted NoSQL database provided by Firebase, used for storing all historical messages in real time. The backend communicates with this database to fetch, store, update, and delete messages.

## Setup Instructions

To run this backend project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies:
   ```
   npm install
   ```
4. Set up Firebase Realtime Database and obtain the necessary credentials (API key, database URL, etc.).
5. Configure the backend to connect to your Firebase database by updating the `.env` file or directly modifying the backend code.
6. Start the backend server:
   ```
   npm start
   ```

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests with any improvements or features you'd like to add.

## Frontend Repository

The frontend part of the Message Board project is in a separate repository. You can find it [here](https://github.com/AxiomaticAdi/message-board-front).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use and modify the code as per the terms of the license.

Thank you for checking out the Message Board Backend project! If you have any questions or suggestions, please don't hesitate to reach out. Happy coding!
