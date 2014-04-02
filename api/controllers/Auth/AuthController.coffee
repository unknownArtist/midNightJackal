module.exports =
  index: (req, res) ->
    res.view "home/index"

  register: (req, res) ->
    res.view "auth/register",
      layout: "layouts/public"


  signup: (req, res) ->
    User.create
      first_name: req.param("first_name")
      last_name: req.param("last_name")
      email: req.param("email")
      password: req.param("password")
    , (err, user) ->
      if err
        res.json
          status: 404
          error: err
      else
        res.json
          status: 200
          message: "User Created"



  login: (req, res) ->
    res.view "auth/login",
      layout: "layouts/public"


  authenticate: (req, res) ->
    # bcrypt = undefined

    bcrypt = require("bcrypt")
    User.findOneByEmail(req.body.email).done (err, user) ->
      if err
        res.json
          error: err
          status: 500
          message: "Opps something is very wrong"

      if user
        bcrypt.compare req.body.password, user.password, (err, match) ->
          if err
            res.json
              error: err
              status: 500
              message: "Opps something is very wrong"

          if match
            req.session.user = user.id
            res.json
              user: user
              status: 200

          else
            req.session.user = req.session.user = null
            res.json
              error: err
              status: 400
              message: "Incorrect password"


      else
        res.json
          error: err
          message: "User not found"
          status: 404

