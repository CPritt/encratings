function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next(); 
  }

  console.log("not logged in");
  return res.redirect('/login'); 
}

module.exports = { isAuthenticated };