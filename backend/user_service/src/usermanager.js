//This module initialises the API for the Postgresql database, by defining the API routes.

//Import Dependencies
const Pool = require('pg').Pool;

const pool = new Pool({
    host: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const checkConnection = () => {
    // Check if PG DB is up.
    const query = 'SELECT NOW()';
    pool.query(query, (error, results) => {
        if (error) {
            console.log('Error connecting to DB. Exiting.');
            return process.exit(1); //Connection retry logic is in Docker compose.
        }
        console.log(`UserManager's PostgreqSQL DB running on port ${process.env.DB_PORT}.`);
    });
}

const initialiseDB = () => {
    // Check DB is up
    checkConnection();

    const query = `
        BEGIN; 

        -- DROP TABLE IF EXISTS users; --Support Data Persistence

        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            token TEXT
            );
        
        COMMIT;
    `; // Ensures sequential execution of queries.

    pool.query(query, (error, results) => {
        if (error) {
            console.log('Initialisation: Error initialising Users table.');
            return process.exit(1);
        }
        console.log(`Initialisation: Initialised Users table.`);
    });
};

const createUser = (request, response) => {
    const {name, token} = request.body;
    const query = `INSERT INTO users VALUES (DEFAULT, $1, $2) RETURNING id`;

    if (!request.body || !name || name.length == 0) {
        // Reject if 'name' is empty;
        const msg = {'msg': `Name cannot be empty.`, 'id': null};
        return response.status(400).json(msg);
    }
    if (name.length > 255) {
        // Reject if 'name' is too long.
        const msg = {'msg': `Name cannot be longer than 255 characters.`, 'id': null};
        return response.status(400).json(msg);
    }

    pool.query(query, [name, token], (error, results) => {
        if (error) {
            const msg = {'msg': error.message, 'id': null};
            return response.status(500).json(msg);
        }
        const allUsers = results.rows;
        const numUsers = allUsers.length;
        if (numUsers != 1) {
            // Should not happen, but just in case.
            const msg = {'msg': 'Error adding user to DB.', 'id': null};
            return response.status(500).json(msg);
        }

        const userId = allUsers[0].id;
        const msg = {'msg': `User added with ID ${userId}.`, 'id': userId};
        return response.status(201).json(msg);
    })};

const getUsers = (request, response) => {
    const query = 'SELECT id, name FROM users ORDER BY id ASC';

    pool.query(query, (error, results) => {
        if (error) {
            const msg = {'msg': error.message, 'users': null};
            return response.status(500).json(msg);
        }
        const allUsers = results.rows;
        const numUsers = allUsers.length;
        if (numUsers < 1) {
            const msg = {'msg': `No users found.`, 'users': null};
            return response.status(404).json(msg);
        }

        const msg = {'msg': `${numUsers} users retrieved.`, 'users': allUsers};
        return response.status(200).json(msg);
    })};

const getUserById = (request, response) => {
    const userId = parseInt(request.params.id);
    const query = `SELECT id, name FROM users WHERE id = ${userId}`;

    if (!request.params || !request.params.id || userId == NaN) {
        // Reject if 'userId' is empt or invalid.
        const msg = {'msg': `ID cannot be empty nor invalid.`, 'user': null};
        return response.status(400).json(msg);
    }

    pool.query(query, (error, results) => {
        if (error) {
            const msg = {'msg': error.message, 'user': null};
            return response.status(500).json(msg);
        }
        const allUsers = results.rows;
        const numUsers = allUsers.length;
        if (numUsers != 1) {
            const msg = {'msg': `No user found with ID ${userId}.`, 'user': null};
            return response.status(404).json(msg);
        }

        const user = allUsers[0]; //In theory, if id is a PK, users should only have 1 row.
        const msg = {'msg': `User retrieved with ID ${userId}.`, 'user': user};
        return response.status(200).json(msg);
    })};

const updateUser = (request, response) => {

    const {name, token} = request.body;
    const userId = parseInt(request.params.id);
    if (!request.body || (!name || name.length == 0) && (!token || token.length == 0)) {
        // Reject if all fields are empty;
        const msg = {'msg': `At least one field must be filled.`};
        return response.status(400).json(msg);
    }
    if (name && name.length > 255) {
        // Reject if 'name' is too long.
        const msg = {'msg': `Name cannot be longer than 255 characters.`};
        return response.status(400).json(msg);
    }
    if (!request.params || !request.params.id || userId == NaN) {
        // Reject if 'userId' is empt or invalid.
        const msg = {'msg': `ID cannot be empty nor invalid.`};
        return response.status(400).json(msg);
    }

    //Get old data
    const get_query = `SELECT id, name FROM users WHERE id = ${userId}`;
    const user = pool.query(get_query, (error, results) => {
        if (error) {
            const msg = {'msg': error.message};
            return response.status(500).json(msg);
        }
        return results.rows[0]; //In theory, if id is a PK, users should only have 1 row.
    });
    if (!name) {
        name = user.name;
    }
    if (!token) {
        token = user.token;
    }

    const query = `UPDATE users SET name = $1, token = $2 WHERE id = $3 RETURNING id`;
    pool.query(query, [name, token, userId], (error, results) => {
        if (error) {
            const msg = {'msg': error.message};
            return response.status(500).json(msg);
        }
        const allUsers = results.rows;
        const numUsers = allUsers.length;
        if (numUsers != 1) {
            // Should not happen, but just in case.
            const msg = {'msg': 'Error updating user to DB. Check your User ID.'};
            return response.status(500).json(msg);
        }
        const msg = {'msg': `User modified with ID ${userId}.`};
        return response.status(200).json(msg);
    })
};

const deleteUser = (request, response) => {
    const userId = parseInt(request.params.id);
    const query = `DELETE FROM users WHERE id = $1 RETURNING id`;

    if (!request.params || !request.params.id || userId == NaN) {
        // Reject if 'userId' is empt or invalid.
        const msg = {'msg': `ID cannot be empty nor invalid.`};
        return response.status(400).json(msg);
    }

    pool.query(query, [userId], (error, results) => {
        if (error) {
            const msg = {'msg': error.message};
            return response.status(500).json(msg);
        }
        const allUsers = results.rows;
        const numUsers = allUsers.length;
        if (numUsers != 1) {
            // Should not happen, but just in case.
            const msg = {'msg': 'Error deleting user from DB. Check your User ID.'};
            return response.status(500).json(msg);
        }
        const msg = {'msg': `User deleted with ID ${userId}.`};
        return response.status(200).json(msg);
    })};

module.exports = {
    initialiseDB,

    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};