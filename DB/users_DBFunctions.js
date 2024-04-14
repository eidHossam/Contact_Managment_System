const pool = require("./mysqlDB_Connection");

const DB_registerUser = async (name, email, password) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Perform the query to register a new user
        const query =
            "INSERT INTO `users` (`username`, `email`, `password`) VALUES (?, ?, ?)";
        const result = await connection.query(query, [name, email, password]);

        return result;
    } catch (error) {
        throw new Error("Failed to create user in SQL: " + error.message);
    } finally {
        // Make sure to release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

const DB_getUser = async (email) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Perform the query to get a user by email
        const query = "SELECT * FROM users WHERE `email` = ?";
        const result = await connection.query(query, [email]);

        return result;
    } catch (error) {
        throw new Error("Failed to find user in SQL: " + error.message);
    } finally {
        // Make sure to release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};
module.exports = { DB_registerUser, DB_getUser };
