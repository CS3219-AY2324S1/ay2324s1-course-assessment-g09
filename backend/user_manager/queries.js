const Pool = require('pg').Pool;
const pool = new Pool({
    host: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC',  (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })};

const getUserById = (request, response) => {
    pool.query('SELECT * FROM users WHERE id = $1', [request.params.id],  (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })};

const createUser = (request, response) => {
    console.log()
    pool.query('INSERT INTO users(name) VALUES ($1)', [request.body.name],  (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`User added with ID: ${results.insertId}`); //To fix
    })};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const {name} = request.body;

    pool.query('UPDATE users SET name = $1 WHERE id = $2', [name, id],  (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User modified with ID: ${id}`);
    })};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id],  (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    })};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};