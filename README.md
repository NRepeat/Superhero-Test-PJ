Superhero Database Web Application
This web application allows you to manage data related to superheroes. You will need PostgreSQL and Node.js installed to run this application.

Getting Started
Clone the Repository: Start by cloning this repository to your local machine.

bash
Copy code
git clone https://github.com/NRepeat/Superhero-Test-PJ.git
Install Dependencies: Navigate to the project directory and install the required dependencies for both the server and client.

bash
Copy code
cd superhero-database-web-app
./start-dev.sh
Alternatively, you can install dependencies manually:

bash
Copy code
# Install server dependencies
cd Server-Sp
npm install

# Install client dependencies
cd ../react-redux-client
npm install
Start the Application: To start the web application, you can use the provided script or start the server and client manually.

Using the provided script:

bash
Copy code
./start-dev.sh
Manually starting the server and client:

bash
Copy code
# Start the server
cd Server-Sp
npm start

# Start the client
cd ../react-redux-client
npm start
Access the Application: Once the server and client are running, you can access the web application in your browser by navigating to http://localhost:3000.

Features
Create new superhero records
View existing superhero records
Edit superhero details
Delete superhero records
Technologies Used
PostgreSQL: Database management system for storing superhero data.
Node.js: Server-side JavaScript runtime.
React.js: Front-end library for building user interfaces.
Redux: State management library for managing application data.