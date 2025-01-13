# Employee Tracker

## Description

Employee Tracker is a command-line application built with Node.js and PostgreSQL that allows business owners to manage their company's employee database. This application enables users to view and interact with employee information stored in a database, making it easy to organize and plan business structures.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Credits](#credits)
- [License](#license)

## Installation

1. Clone the repository to your local machine
2. Navigate to the project directory
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with your PostgreSQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=employee_tracker_db
   DB_PORT=5432
   ```
5. Set up your database by running the schema and seeds files:
   ```bash
   psql -U your_username -f db/schema.sql
   psql -U your_username -f db/seeds.sql
   ```

## Usage

1. Start the application by running:
   ```bash
   npm start
   ```

2. Use the arrow keys to navigate through the following options:
   - View all departments
   - View all roles
   - View all employees
   - Add a department
   - Add a role
   - Add an employee
   - Update an employee role
   - Update employee managers
   - View employees by manager
   - View employees by department
   - Delete departments, roles, or employees
   - View total utilized budget by department

3. Follow the prompts to perform your desired action

## Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles and managers
- View employees by manager
- View employees by department
- Delete departments, roles, and employees
- Calculate total utilized budget of a department
- User-friendly command-line interface
- Data persistence using PostgreSQL database
- Secure database connection using environment variables

## Technologies Used

- Node.js
- PostgreSQL
- npm packages:
  - Inquirer.js (v8.2.4)
  - pg (v8.11.3)
  - dotenv (v16.4.1)
  - console.table (v0.10.0)

## Credits

Developed by Marcello Romero

## License

This project is licensed under the MIT License.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Questions

For any questions or concerns, please open an issue in the GitHub repository or contact the developer directly at mra24@me.com

GitHub: [marcelloro24](https://github.com/marcelloro24)
