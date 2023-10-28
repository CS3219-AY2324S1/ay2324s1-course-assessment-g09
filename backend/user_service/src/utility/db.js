const Pool = require('pg').Pool;

const userAccountTable = "user_account";

const db = new Pool({
    host: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const checkConnection = () => {
    // Check if PG DB is up.
    const query = 'SELECT NOW()';
    db.query(query, (error, results) => {
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

        DROP TABLE IF EXISTS user_account; --Support Data Persistence (for Production)

        -- CreateTable
        CREATE TABLE "${userAccountTable}" (
            "id" SERIAL NOT NULL,
            "email" TEXT NOT NULL,
            "username" TEXT,
            "name" TEXT,
            "role" TEXT NOT NULL,
            "password" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        
            CONSTRAINT "user_account_pkey" PRIMARY KEY ("id")
        );
        
        -- CreateIndex
        CREATE UNIQUE INDEX "user_account_email_key" ON "${userAccountTable}"("email");
        
        -- CreateIndex
        CREATE UNIQUE INDEX "user_account_username_key" ON "${userAccountTable}"("username");
        
        
        COMMIT;
    `; // Ensures sequential execution of queries.

    db.query(query, (error, results) => {
        if (error) {
            console.log('Initialisation: Error initialising Users table.');
            return process.exit(1);
        }
        console.log(`Initialisation: Initialised Users table.`);
        if (process.env.NODE_ENV != "production") {
            const values = ["admin@peerprep.com", "admin", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"];
            const adminQuery = `INSERT INTO ${userAccountTable} (email, username, name, role, password) VALUES ($1, $2, $3, $4, $5);`;
            db.query(adminQuery, values, (error, results) => {
                if (error) {
                    console.log('Initialisation: Error initialising Admin account.');
                    return process.exit(1);
                }
                console.log(`Initialisation: Initialised Admin account.`);
            });
        }

    });


};

module.exports = {
    db: db,
    initialiseDB: initialiseDB,
    userAccountTable: userAccountTable
};
