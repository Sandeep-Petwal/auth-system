# Auth System Task
1. Clone the project from GitHub using the command `git clone https://github.com/Sandeep-Petwal/auth-system.git`
2. Install all the dependencies using the command `npm install`
3. Create a PostgreSQL database and update the database credentials in the `.env` file like mentioned in `.sample.env`
4. Start the server using the command `npm run start`

# Functionality

- User registration with email and password
- User login with email and password
- User authentication using JWT

# Endpoints

- `POST /register`: Registers a new user
- `POST /login`: Logs in an existing user
- `GET /profile`: Gets the user profile
- `POST /profile`: Updates the user profile

# Technologies Used
- Node.js
- Express.js
- PostgreSQL
- Bcrypt
- JSON Web Tokens (JWT)
- Node-cron
- EJS
- Axios
- ValidatorJS
- Dotenv
- Cookie-parser
- Express-rate-limit