const pool = require("./mysqlDB_Connection");

// Define an async function to retrieve all contacts from the 'contacts' table
const DB_getContacts = async (user_id) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Perform the query to retrieve all contacts
        const query = "SELECT * FROM contacts WHERE `user_id` = ?";
        const [rows] = await connection.query(query, [user_id]);

        // Return the retrieved contacts
        return rows;
    } catch (error) {
        console.log(error.message);
        throw new Error("Failed to retrieve contacts: " + error.message);
    } finally {
        // Make sure to release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

const DB_createContact = async (name, email, phoneNumber, user_id) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Perform the query to insert a new contact
        const query =
            "INSERT INTO `contacts` (`user_id`, `contactName`, `email`, `phoneNumber`) VALUES (?, ?, ?, ?)";
        const result = await connection.query(query, [
            user_id,
            name,
            email,
            phoneNumber,
        ]);

        return result;
    } catch (error) {
        throw new Error("Failed to create contact in SQL: " + error.message);
    } finally {
        // Make sure to release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

const DB_getContact = async (name) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Perform the query to get a contact by name
        const query = "SELECT * FROM contacts WHERE `contactName` = ?";
        const result = await connection.query(query, [name]);

        return result; // Convert rows to JSON string
    } catch (error) {
        throw new Error("Failed to find contact in SQL: " + error.message);
    } finally {
        // Make sure to release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

const DB_DeleteContact = async (name) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Perform the query to delete a contact
        const query = "DELETE FROM contacts WHERE `contactName` = ?";
        const result = await connection.query(query, [name]);

        return result; // Convert rows to JSON string
    } catch (error) {
        throw new Error("Failed to delete contact in SQL: " + error.message);
    } finally {
        // Make sure to release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

const DB_updateContact = async (newName, email, phoneNumber, oldName) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Perform the query to update a contact
        const query =
            "UPDATE `contacts` SET `contactName` = ?, `email` = ?,  `phoneNumber` = ? WHERE `contactName` = ?";
        const result = await connection.query(query, [
            newName,
            email,
            phoneNumber,
            oldName,
        ]);

        return result;
    } catch (error) {
        throw new Error("Failed to update contact in SQL: " + error.message);
    } finally {
        // Make sure to release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

module.exports = {
    DB_getContacts,
    DB_createContact,
    DB_getContact,
    DB_DeleteContact,
    DB_updateContact,
};
