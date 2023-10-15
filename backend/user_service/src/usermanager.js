//This module initialises the API for the Postgresql database, by defining the API routes.

//Import Dependencies
const pool = require('./utility/db').db;
const userAccountTable = require('./utility/db').userAccountTable;

// const createUser = (request, response) => {
//     const { name, token } = request.body;
//     const query = `INSERT INTO ${userAccountTable} VALUES (DEFAULT, $1, $2) RETURNING id`;

//     if (!request.body || !name || name.length == 0) {
//         // Reject if 'name' is empty;
//         const msg = { 'msg': `Name cannot be empty.`, 'id': null };
//         return response.status(400).json(msg);
//     }
//     if (name.length > 255) {
//         // Reject if 'name' is too long.
//         const msg = { 'msg': `Name cannot be longer than 255 characters.`, 'id': null };
//         return response.status(400).json(msg);
//     }

//     pool.query(query, [name, token], (error, results) => {
//         if (error) {
//             const msg = { 'msg': error.message, 'id': null };
//             return response.status(500).json(msg);
//         }
//         const allUsers = results.rows;
//         const numUsers = allUsers.length;
//         if (numUsers != 1) {
//             // Should not happen, but just in case.
//             const msg = { 'msg': 'Error adding user to DB.', 'id': null };
//             return response.status(500).json(msg);
//         }

//         const userId = allUsers[0].id;
//         const msg = { 'msg': `User added with ID ${userId}.`, 'id': userId };
//         return response.status(201).json(msg);
//     })
// };

const getUsers = (request, response) => {
    const query = `SELECT id, username FROM ${userAccountTable} ORDER BY id ASC`;

    pool.query(query, (error, results) => {
        if (error) {
            const msg = { 'msg': error.message, 'users': null };
            return response.status(500).json(msg);
        }
        const allUsers = results.rows;
        const numUsers = allUsers.length;

        const msg = { 'msg': `${numUsers} users retrieved.`, 'users': allUsers };
        return response.status(200).json(msg);
    })
};

const getUserById = (request, response) => {
    const userId = parseInt(request.params.id);
    const query = `SELECT id, username FROM ${userAccountTable} WHERE id = ${userId}`;

    if (!request.params || !request.params.id || userId == NaN) {
        // Reject if 'userId' is empt or invalid.
        const msg = { 'msg': `ID cannot be empty nor invalid.`, 'user': null };
        return response.status(400).json(msg);
    }

    pool.query(query, (error, results) => {
        if (error) {
            const msg = { 'msg': error.message, 'user': null };
            return response.status(500).json(msg);
        }
        const allUsers = results.rows;
        const numUsers = allUsers.length;
        if (numUsers != 1) {
            const msg = { 'msg': `No user found with ID ${userId}.`, 'user': null };
            return response.status(404).json(msg);
        }

        const user = allUsers[0]; //In theory, if id is a PK, users should only have 1 row.
        const msg = { 'msg': `User retrieved with ID ${userId}.`, 'user': user };
        return response.status(200).json(msg);
    })
};

const updateUser = async (request, response) => {
    try {
        const body = request.body;
        const { id, email, username, password, role } = userSchema.parse(body);

        const pwHash = await bcrypt.hash(password, 17);

        const updateQuery = `UPDATE ${userAccountTable} SET email=$1, username=$2, role=$3, password=$4 WHERE id=$6`;
        const queryResult = await pool.query(updateQuery, [email, username, role, pwHash, id]);
        if (queryResult.rows.length != 1) {
            throw new Error('Unsuccessful update into database');
        }
    } catch (error) {
        return response.status(500).json({ message: ["something went wrong..."] });
    }
};

const deleteUser = (request, response) => {
    const userId = parseInt(request.params.id);
    const query = `DELETE FROM ${userAccountTable} WHERE id = $1 RETURNING id`;

    if (!request.params || !request.params.id || userId == NaN) {
        // Reject if 'userId' is empt or invalid.
        const msg = { 'msg': `ID cannot be empty nor invalid.` };
        return response.status(400).json(msg);
    }

    pool.query(query, [userId], (error, results) => {
        if (error) {
            const msg = { 'msg': error.message };
            return response.status(500).json(msg);
        }
        const allUsers = results.rows;
        const numUsers = allUsers.length;
        if (numUsers != 1) {
            // Should not happen, but just in case.
            const msg = { 'msg': 'Error deleting user from DB. Check your User ID.' };
            return response.status(500).json(msg);
        }
        const msg = { 'msg': `User deleted with ID ${userId}.` };
        return response.status(200).json(msg);
    })
};

module.exports = {
    // createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
