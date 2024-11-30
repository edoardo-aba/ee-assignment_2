

This project is a full-stack web application designed to manage and analyze experiments. It is composed of two main components:

- Client (Frontend): A React-based user interface.
- Server (Backend): A Node.js, Express and MongoDB-powered API.

Follow the instructions below to set up and run the project.

# Client Setup (Frontend)

1. Create a `.env` File

Inside the `client` folder, create a `.env` file and include the following fields (comment the second one if run locally):

```env

REACT_APP_API_BASE_URL=http://localhost:5000  // to run it locally if the project is offline

REACT_APP_API_BASE_URL=https://ee-assignment-2.onrender.com  // if the project is online

```

2. Install Dependencies

Open a terminal, navigate to the `client` folder, and run:

```bash

npm install

```

3. Run the Frontend

Start the React development server by running:

```bash

npm start

```

The frontend will be accessible at `http://localhost:3000`.



# Server Setup (Backend)

1. Create a `.env` File

Inside the `server` folder, create a `.env` file and include the following fields:

```env

MONGO_URI=mongodb+srv://<username>:<password>@experiment.imnwh.mongodb.net/register

PORT=5000

```

- Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

2. MongoDB Setup

No special setup is required for the database itself.

- Ensure the database named `register` exists in your MongoDB instance(specified in the mongoURI above /register).
- Inside the `register` database, create the following collections:
- `users`
- `answers`

3. Install Dependencies

Open a terminal, navigate to the `server` folder, and run:

```bash

npm install

```

4. Run the Backend

Start the backend server by running:

```bash

npm start

```

The backend server will run on `http://localhost:5000`.

---

