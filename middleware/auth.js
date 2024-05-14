//middleware for authentication

const auth = {
    isLoggedin: (req, res, next) => {
        if (req.session && req.session.user) {
            next();
        } else {
            res.redirect('/?error=unauthorized');
        }
    }
};

module.exports = auth;
