const asyncHanlder = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DB_registerUser, DB_getUser } = require("../DB/users_DBFunctions");

/**
 * @brief Register user
 * @route POST api/users/register
 * @access public
 */
const register = asyncHanlder(async (req, res) => {
    const { username, email, password } = req.body;

    //Check if any of the fields are empty
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields must be provided");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await DB_registerUser(username, email, hashedPassword);

    res.status(201).json({
        message: "Registration successful",
        result: result[0],
        data: {
            username: username,
            email: email,
        },
    });
});

/**
 * @brief Login user
 * @route POST api/users/login
 * @access public
 */
const login = asyncHanlder(async (req, res) => {
    const { email, password } = req.body;

    //Check if any of the fields are empty
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields must be provided");
    }

    const user = await DB_getUser(email);

    //Validate that we found the user with the required email.
    if (user[0].length !== 0) {
        if (await bcrypt.compare(password, user[0][0].password)) {
            const accessToken = jwt.sign(
                {
                    user: {
                        username: user[0][0].username,
                        user_id: user[0][0].id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "5m" }
            );

            res.status(200).json({ message: "Login Successful", accessToken });
        } else {
            res.status(400);
            throw new Error("The password provieded is invalid!");
        }
    } else {
        //Validation error
        res.status(400);
        throw new Error("The email provieded isn't registered!");
    }
});

/**
 * @brief Get the information of the current user.
 * @route GET api/users/current
 * @access private
 */
const currentUser = asyncHanlder(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { register, login, currentUser };
