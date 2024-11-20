const pool = require('../config/connection');

class DB {
    constructor(pool) {
        this.pool = pool;
    }

    // View all departments
    async viewAllDepartments() {
        try {
            const result = await this.pool.query('SELECT * FROM department ORDER BY id');
            return result.rows;
        } catch (err) {
            console.error('Error viewing departments:', err);
            throw err;
        }
    }

    // View all roles
    async viewAllRoles() {
        try {
            const query = `
                SELECT r.id, r.title, r.salary, d.name as department
                FROM role r
                JOIN department d ON r.department_id = d.id
                ORDER BY r.id
            `;
            const result = await this.pool.query(query);
            return result.rows;
        } catch (err) {
            console.error('Error viewing roles:', err);
            throw err;
        }
    }

    // View all employees
    async viewAllEmployees() {
        try {
            const query = `
                SELECT 
                    e.id,
                    e.first_name,
                    e.last_name,
                    r.title,
                    d.name as department,
                    r.salary,
                    CONCAT(m.first_name, ' ', m.last_name) as manager
                FROM employee e
                LEFT JOIN role r ON e.role_id = r.id
                LEFT JOIN department d ON r.department_id = d.id
                LEFT JOIN employee m ON e.manager_id = m.id
                ORDER BY e.id
            `;
            const result = await this.pool.query(query);
            return result.rows;
        } catch (err) {
            console.error('Error viewing employees:', err);
            throw err;
        }
    }

    // Add a department
    async addDepartment(name) {
        try {
            const result = await this.pool.query(
                'INSERT INTO department (name) VALUES ($1) RETURNING *',
                [name]
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error adding department:', err);
            throw err;
        }
    }

    // Add a role
    async addRole(title, salary, departmentId) {
        try {
            const result = await this.pool.query(
                'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
                [title, salary, departmentId]
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error adding role:', err);
            throw err;
        }
    }

    // Add an employee
    async addEmployee(firstName, lastName, roleId, managerId) {
        try {
            const result = await this.pool.query(
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [firstName, lastName, roleId, managerId]
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error adding employee:', err);
            throw err;
        }
    }

    // Update employee role
    async updateEmployeeRole(employeeId, roleId) {
        try {
            const result = await this.pool.query(
                'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *',
                [roleId, employeeId]
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error updating employee role:', err);
            throw err;
        }
    }
}

module.exports = new DB(pool); 