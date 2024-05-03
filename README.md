## Getting Started

This guide will help you get the application running on another device using the repository on GitHub.

### Prerequisites

- **Git**: To clone the repository.
- **Node.js**: This application requires Node.js to run.
- **MongoDB**: Ensure you have MongoDB set up and running if the database is hosted locally or ensure you have access to an external MongoDB URI.

## Installation

Follow these steps to set up and run the application:

###1. Clone the repository:
   ```bash
   git clone https://github.com/Joao-Potes/DissApp.git [GitHub-Repository-URL]
   cd DissApp [repository-name]

###2.Install Node.js
Download and install Node.js from the official Node.js website.

###2.1 Install Python
Download and install Python from the official website, if you which to use the online compiler.

###3. Install Dependencies
In the project directory terminal run:
   ```bash
   npm install

This command installs all the necessary dependencies listed in the package.json file.

###4. Setup Environment Variables
Create a '.env' file in the root directory of the project, and add the necessary environment variables:
   ´´´bash
   MONGODB_URI=mongodb://username:password@localhost:27017/myFirstDatabase
   SESSION_SECRET=your_secret_key
   COMPILER_DIR=your_python_executable_file_directory

Replace username, password, myFirstDatabase, and your_secret_key with your actual MongoDB credentials and session secret.
You can find the python executable file directory by opening your cmd prompt shell and running: 'where python', then make sure you follow a syntax like C:\\Users\\J\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe
 
###5.Start Application
You can run the application by running the following command:
   ´´´bash
   node app.js

The application should be running on port localhost:8000, a link will be provided in the terminal.



