module.exports = (res, error) => {
    console.log(error.message ? error.message : error)
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}
