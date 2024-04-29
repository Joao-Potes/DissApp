module.exports = {
  // Middleware to ensure that the user is authenticated
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // If authenticated, proceed to the next middleware
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/login'); // If not authenticated, redirect to the login page
  },
  // Middleware to forward authenticated users to the home page
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next(); // If not authenticated, proceed to the next middleware
    }
    res.redirect('/'); // If authenticated, redirect to the home page
  }
};
