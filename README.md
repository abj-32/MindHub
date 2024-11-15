# MindHub - A Blogging Platform

MindHub is a Node.js-based blogging website built with Express.js, EJS for templating, and MongoDB as the database. It provides a simple and intuitive platform for users to create, read, update, and delete blog posts.

---

## Features

- User-friendly interface for managing blogs.
- CRUD operations for blog posts.
- Dynamic content rendering using EJS.
- MongoDB integration for seamless data storage.
- Responsive design for better user experience.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML, CSS
- **Database:** MongoDB
- **Dependencies:** Mongoose, Body-parser, and more.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mindhub.git

2. Navigate to the project directory:

   ```bash
   cd mindhub
3. Install dependencies:

   ```bash
   npm install
4. Create a .env file in the root directory and add the following:

   ```bash
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
5. Start the development server:

   ```bash
   npm start
6.Open your browser and navigate to http://localhost:3000.



---

## Usage

- Home: View a list of all blog posts.
- Add Blog: Add a new blog post.
- Read..: Read a blog post in detail.

---

## Folder Structure

   ```bash
   mindhub/
├── middlewares     # middlewares to handle authentication
├── controllers     # Route Controllers and Handlers for various routes and actions
├── public/         # Static files (CSS, JS, Images)
├── views/          # EJS templates
├── routes/         # Express routes
├── models/         # Mongoose schemas
├── .env            # Environment variables
├── index.js        # Main application file
├── package.json    # Dependencies and scripts



