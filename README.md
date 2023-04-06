Blog App
This is a full-stack blog application built with Node.js, Next.js, react, and MongoDB.

Features
Users can view all published blog posts on the home page.
Users can click on a post to view its details, including comments.
Users can search for posts by keyword using the search bar.
Users can register for an account or log in to their existing account.
Authenticated users can create new blog posts.
Authenticated users can edit or delete their own blog posts.
Authenticated users can add comments to blog posts.
Authenticated users can view their own profile and see their published blog posts.
Directory Structure
components: React components used throughout the application.
controllers: Express controllers for handling requests and responses.
lib: Helper modules for authentication, database connections, and search functionality.
models: Mongoose models for database schema definitions.
pages: Next.js pages for server-side rendering and client-side routing.
public: Static assets such as images and favicon.
styles: CSS styles for the application using Tailwind CSS.
utils: Utility functions used throughout the application.
.env: Environment variables for configuring the application.
.env.example: Example environment variables file.
.gitignore: Files and directories ignored by Git.
next.config.js: Configuration for Next.js.
package.json: Dependencies and scripts for the application.
README.md: Documentation for the application.
yarn.lock: Dependency lockfile.
Getting Started
Clone the repository and navigate to the project root directory.
Install the dependencies using yarn install.
Create a MongoDB database and add the connection URL to the .env file.
Add a secret key for JWT authentication to the .env file.
Start the development server using yarn dev.
Dependencies
This application relies on the following dependencies:

axios
bcrypt
cookie
dotenv
express
mongoose
next
react
react-dom
tailwindcss
License
This application is licensed under the MIT License. See the LICENSE file for details.
