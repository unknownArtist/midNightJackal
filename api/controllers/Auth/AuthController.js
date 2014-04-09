module.exports = {
  index: function(req, res) {
    return res.view("home/index");
  },
  register: function(req, res) {
    return res.view("auth/register", {
      layout: "layouts/public"
    });
  },
  signup: function(req, res) {
    return User.create({
      first_name: req.param("first_name"),
      last_name: req.param("last_name"),
      email: req.param("email"),
      password: req.param("password")
    }, function(err, user) {
      if (err) {
        return res.json({
          status: 404,
          error: err
        });
      } else {
        return res.json({
          status: 200,
          message: "User Created"
        });
      }
    });
  },
  login: function(req, res) {
    return res.view("auth/login", {
      layout: "layouts/public"
    });
  },
  authenticate: function(req, res) {
    var bcrypt;
    bcrypt = require("bcrypt");
    return User.findOneByEmail(req.body.email).done(function(err, user) {
      if (err) {
        res.json({
          error: err,
          status: 500,
          message: "Opps something is very wrong"
        });
      }
      if (user) {
        return bcrypt.compare(req.body.password, user.password, function(err, match) {
          if (err) {
            res.json({
              error: err,
              status: 500,
              message: "Opps something is very wrong"
            });
          }
          if (match) {
            req.session.user_id = user.id;
            return res.json({
              user: user,
              status: 200
            });
          } else {
            req.session.user = req.session.user = null;
            return res.json({
              error: err,
              status: 400,
              message: "Incorrect password"
            });
          }
        });
      } else {
        return res.json({
          error: err,
          message: "User not found",
          status: 404
        });
      }
    });
  }
};
