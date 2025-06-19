function isAuthenticated(req, res, next) {
    // console.log('Session in auth middleware:', req.session);
  if (req.session && req.session.userId) {
    return next(); 
  }

  console.log("not logged in");
  return res.redirect('/login'); 
}

module.exports = { isAuthenticated };