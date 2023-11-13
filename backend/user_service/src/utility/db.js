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

        --DROP TABLE IF EXISTS user_account; --Support Data Persistence (for Production)

        -- CreateTable
        CREATE TABLE IF NOT EXISTS "${userAccountTable}" (
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
        CREATE UNIQUE INDEX IF NOT EXISTS "user_account_email_key" ON "${userAccountTable}"("email");
        
        -- CreateIndex
        CREATE UNIQUE INDEX IF NOT EXISTS "user_account_username_key" ON "${userAccountTable}"("username");
        
        
        COMMIT;
    `; // Ensures sequential execution of queries.

    db.query(query, (error, results) => {
        if (error) {
            console.log('Initialisation: Error initialising Users table.');
            return process.exit(1);
        }
        console.log(`Initialisation: Initialised Users table.`);
        if (process.env.NODE_ENV != "production") {

            const values = [["admin@peerprep.com", "admin", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin1@peerprep.com", "admin1", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin2@peerprep.com", "admin2", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin3@peerprep.com", "admin3", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin4@peerprep.com", "admin4", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin5@peerprep.com", "admin5", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin6@peerprep.com", "admin6", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin7@peerprep.com", "admin7", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin8@peerprep.com", "admin8", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin9@peerprep.com", "admin9", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin10@peerprep.com", "admin10", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin11@peerprep.com", "admin11", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin12@peerprep.com", "admin12", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin13@peerprep.com", "admin13", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin14@peerprep.com", "admin14", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"],
            ["admin15@peerprep.com", "admin15", "admin tan", "admin", "$2b$06$onVZsDMoFEcm2NfmZIvvWOYDgNezrDeW6AyAHITq0fKVcj8vDacsS"]];

            for (let i = 0; i < 15; i += 1) {
                const adminQuery = `INSERT INTO ${userAccountTable} (email, username, name, role, password) VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (email) DO NOTHING;`;
                db.query(adminQuery, values[i], (error, results) => {
                    if (error) {
                        console.log('Initialisation: Error initialising Admin account.');
                        return process.exit(1);
                    }
                    console.log(`Initialisation: Initialised Admin account.`);
                });
            }

        }

    });


};

module.exports = {
    db: db,
    initialiseDB: initialiseDB,
    userAccountTable: userAccountTable
};
