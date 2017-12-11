export default (res, message, error_code = 5) => {
    res.json({
        status: 500,
        message: message,
        error_code: error_code,
        data: null
    });
}