module.exports = function(req, res, next) {
  // console.log(req.session);
  if(!req.session.isAuthenticated) {
    return res.redirect('/auth');
  }
  next()
}