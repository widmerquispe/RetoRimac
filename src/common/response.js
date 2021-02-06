const response = (statusCode, message) => {
    return {
        statusCode: statusCode,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(message)
    }
};
module.exports = response;
