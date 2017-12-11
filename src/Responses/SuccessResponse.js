export default (res, message, data) => {
    res.json({
        status: 200,
        message: message,
        error_code: null,
        data: data
    });
}