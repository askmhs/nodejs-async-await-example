export default (res, message, error_code = 0) => {
    res.json({
        status: 404,
        message: message,
        error_code: error_code,
        data: null
    });
}