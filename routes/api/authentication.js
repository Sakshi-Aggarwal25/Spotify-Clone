const isLoggedIn = (req, res, next) => {
    req.session.userId = "1009";
    return true;
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

module.exports = isLoggedIn;