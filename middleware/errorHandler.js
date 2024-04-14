const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode ? res.statusCode : 500;

    if (err.message.includes("Duplicate entry")) {
        statusCode = 400;
    } else if (err.message.includes("Failed to update contact")) {
        statusCode = 404;
    } else if (err.message.includes("Failed")) {
        statusCode = 500;
    }

    res.status(statusCode);
    console.log(statusCode);

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized Access",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden Access",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        default:
            console.log("No Errors");
            break;
    }
};

module.exports = errorHandler;
