const inquirer = require('inquirer');
const db = require('./lib/queries');
require('console.table');

// Main menu options
const mainMenuChoices = [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Exit'
];

// Main menu prompt
async function mainMenu() {
    try {
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: mainMenuChoices
            }
        ]);

        switch (choice) {
            case 'View all departments':
                await viewDepartments();
                break;
            case 'View all roles':
                await viewRoles();
                break;
            case 'View all employees':
                await viewEmployees();
                break;
            case 'Add a department':
                await addDepartment();
                break;
            case 'Add a role':
                await addRole();
                break;
            case 'Add an employee':
                await addEmployee();
                break;
            case 'Update an employee role':
                await updateEmployeeRole();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

// View departments
async function viewDepartments() {
    const departments = await db.viewAllDepartments();
    console.table(departments);
    mainMenu();
}

// View roles
async function viewRoles() {
    const roles = await db.viewAllRoles();
    console.table(roles);
    mainMenu();
}

// View employees
async function viewEmployees() {
    const employees = await db.viewAllEmployees();
    console.table(employees);
    mainMenu();
}

// Add department
async function addDepartment() {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
            validate: input => input ? true : 'Department name cannot be empty'
        }
    ]);

    await db.addDepartment(name);
    console.log(`Added ${name} department to the database`);
    mainMenu();
}

// Add role
async function addRole() {
    const departments = await db.viewAllDepartments();
    
    const { title, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
            validate: input => input ? true : 'Role title cannot be empty'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?',
            validate: input => !isNaN(input) && input > 0 ? true : 'Please enter a valid salary'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Which department does this role belong to?',
            choices: departments.map(dept => ({
                name: dept.name,
                value: dept.id
            }))
        }
    ]);

    await db.addRole(title, salary, departmentId);
    console.log(`Added ${title} role to the database`);
    mainMenu();
}

// Add employee
async function addEmployee() {
    const roles = await db.viewAllRoles();
    const employees = await db.viewAllEmployees();
    
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: input => input ? true : 'First name cannot be empty'
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            validate: input => input ? true : 'Last name cannot be empty'
        },
        {
            type: 'list',
            name: 'roleId',
            message: "What is the employee's role?",
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        },
        {
            type: 'list',
            name: 'managerId',
            message: "Who is the employee's manager?",
            choices: [
                { name: 'None', value: null },
                ...employees.map(emp => ({
                    name: `${emp.first_name} ${emp.last_name}`,
                    value: emp.id
                }))
            ]
        }
    ]);

    await db.addEmployee(firstName, lastName, roleId, managerId);
    console.log(`Added ${firstName} ${lastName} to the database`);
    mainMenu();
}

// Update employee role
async function updateEmployeeRole() {
    const employees = await db.viewAllEmployees();
    const roles = await db.viewAllRoles();

    const { employeeId, roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee would you like to update?',
            choices: employees.map(emp => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id
            }))
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'What is their new role?',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        }
    ]);

    await db.updateEmployeeRole(employeeId, roleId);
    console.log('Updated employee role');
    mainMenu();
}

// Start the application
console.log('Welcome to the Employee Tracker');
mainMenu();
