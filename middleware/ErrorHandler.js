export const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.errors || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: err
    })
}