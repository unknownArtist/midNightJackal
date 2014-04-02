var bcrypt;

bcrypt = void 0;

bcrypt = require("bcrypt");

module.exports = {
  schema: true,
  tableName: "users",
  attributes: {
    first_name: {
      type: "string",
      required: true
    },
    last_name: {
      type: "string",
      required: true
    },
    email: {
      type: "email",
      unique: true,
      required: true
    },
    password: {
      type: "string",
      minLength: 7,
      required: true
    },
    avatar: "string",
    dateOfBirth: "date"
  },
  beforeCreate: function(values, next) {
    return bcrypt.hash(values.password, 10, function(err, hash) {
      if (err) {
        return next(err);
      }
      values.password = hash;
      return next();
    });
  }
};
