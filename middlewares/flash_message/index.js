//flash message
function flashMessage (req, res, next) {
    res.locals.flash = req.session.flash;
    res.locals.check = req.session.check;
    delete req.session.flash;
    delete req.session.check;
    next();
}

module.exports = flashMessage;