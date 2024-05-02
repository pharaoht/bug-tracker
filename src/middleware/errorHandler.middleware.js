function errorHandler(err, req, res, next){
     
    console.log('An error occured:', err);

    res.status(500).json({ error: err || 'Internal Server Error'})
};

module.exports = errorHandler;