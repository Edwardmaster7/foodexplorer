# FoodExplorer App

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [API Documentation](#api-documentation)
7. [License](#license)
8. [Contact](#contact)

## Introduction


FoodExplorer is a React-based web application built with Vite, that allows users to explore and discover dishes from a restaurant, like a digital menu. You can visit the deploy [here](https://foodexplorer-prod.netlify.app).
Admins are able to manage the restaurant's dishes. I followed the mobile-first approach, using styled-components, focusing on the user experience on all devices. I also use the Context API to manage the state and the authentication, as well as the use of cookies to store the user's session. 

## Features

### Users can
- Sign up and login
- See the dishes from the restaurant sorted by category
- Search for a dish by name and by ingredients
- Set a quantity and add it to the order
- See the details of the dish
- See the ingredients of the dish
- Add a dish to the favorites
- See their favorite dishes and unfavorite them

### Admins can
- Add, edit and delete dishes
- See the favorited dishes, ordered by the number of times they were favorited and sorted by category
- Search for a dish by name and by ingredients

## Showcase

![FoodExplorer Showcase](./showcase.gif)

## Future planned features 
# For Admins
- Order history and tracking
- CRUD for Categories
- Edition and deletion of Ingredients
- Enable or disable comments and rating
# For Users
- Order tracking and history
- Comment and Rate a dish, and see comments from other users

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 20.10.0 or higher)
- npm or yarn

## Installation

### Backend (API)

1. Clone the repository:
   ```
   git clone https://github.com/Edwardmaster7/foodexplorer.git
   ```

2. Navigate to the Backend directory:
   ```
   cd foodexplorer/Backend
   ```

3. Run the build script:
   ```
   npm run build
   ```

4. Set up environment variables:
   - Create a `.env` file in the Backend directory
   - Add necessary environment variables (e.g., DATABASE_URL, JWT_SECRET)

5. Run database migrations:
   ```
   npm run migrate
   ```

6. Start the backend server:
   ```
   npm run dev
   ```

### Frontend (App)

1. Navigate to the App directory:
   ```
   cd ../App/foodexplorer-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the App/foodexplorer-app directory
   - Add necessary environment variables (e.g., VITE_API_URL)

4. Start the development server:
   ```
   npm run dev
   ```

## Post-install

1. Add the admin user to the database:
   ```
   npm run add-admin
   ```

This will start both the backend and frontend development servers. The frontend will be accessible in your default browser.

## Configuration

This project uses two official Vite plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## API Documentation

For detailed information about the FoodExplorer API endpoints and how to use them, please refer to our [Postman API Documentation](https://documenter.getpostman.com/view/37660327/2sAY4rGRZG).

This documentation provides a comprehensive guide to all available API routes, request/response formats, and authentication requirements.

## License

This project is licensed under the MIT licence - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

If you have any questions or feedback, please reach out:

- Your Name - [Eduardo Batista](mailto:eduardoobatista2002@hotmail.com)
- Project Link: [https://github.com/Edwardmaster7/foodexplorer](https://github.com/Edwardmaster7/foodexplorer)
