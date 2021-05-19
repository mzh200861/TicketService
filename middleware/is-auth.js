module.exports = (req, res, next) => {
    if(!req.body.header.split(' ')[1]) {
        console.log("Unauthorized access")
        return res.redirect('/')
    } 
    next();
}