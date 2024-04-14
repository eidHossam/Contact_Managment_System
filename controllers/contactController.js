const asyncHandler = require("express-async-handler");
const {
    DB_getContacts,
    DB_createContact,
    DB_getContact,
    DB_DeleteContact,
    DB_updateContact,
} = require("../DB/contacts_DBFunctions");

/**
 * @brief Get all contacts
 * @route GET api/contacts
 * @access private
 */
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await DB_getContacts(req.user.user_id);
    res.status(200).json({
        message: `Sending all contacts of user: ${req.user.user_id}`,
        data: contacts,
    });
});

/**
 * @brief Create a contacts
 * @route POST api/contacts
 * @access private
 *
 * @note asyncHanlder only takes care of the errors thrown by the async functions
 * the database errors need to be handled manually.
 */
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber } = req.body;

    if (!name || !email || !phoneNumber) {
        res.status(400);
        throw new Error("All fields must be provided");
    }

    const result = await DB_createContact(
        name,
        email,
        phoneNumber,
        req.user.user_id
    );

    res.status(201).json({
        message: "Created a contact",
        contact: req.body,
        result: result,
    });
});

/**
 * @brief Get a single contact with the specified id
 * @route GET api/contacts/:id
 * @access private
 */
const getContactWithID = asyncHandler(async (req, res) => {
    const contact = await DB_getContact(req.params.id);

    if (contact[0].length === 0) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json({
        message: `Sending contact with id: ${req.params.id}`,
        contact: contact[0],
    });
});

/**
 * @brief Update a contact
 * @route PUT api/contacts/:id
 * @access private
 */
const updateContact = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber } = req.body;

    const contact = await DB_getContact(req.params.id);

    if (contact[0].length === 0) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updateResult = await DB_updateContact(
        name,
        email,
        phoneNumber,
        req.params.id
    );

    res.status(200).json({
        message: `Updating contact with id: ${req.params.id}`,
        result: updateResult,
    });
});

/**
 * @brief Delete a contacts
 * @route Delete api/contacts/:id
 * @access private
 */
const deleteContact = asyncHandler(async (req, res) => {
    const result = await DB_DeleteContact(req.params.id);

    if (result[0].affectedRows === 1) {
        res.status(200).json({
            message: `Deleted contact with id: ${req.params.id}`,
            result: result[0],
        });
    } else if (result[0].affectedRows === 0) {
        res.status(404);
        throw new Error(`Couldn't find contact with id: ${req.params.id}`);
    }
});

module.exports = {
    getContacts,
    createContact,
    getContactWithID,
    updateContact,
    deleteContact,
};
