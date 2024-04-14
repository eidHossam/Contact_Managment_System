const express = require("express");
const router = express.Router();
const {
    getContacts,
    createContact,
    getContactWithID,
    updateContact,
    deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

router
    .route("/:id")
    .get(getContactWithID)
    .put(updateContact)
    .delete(deleteContact);

module.exports = router;
