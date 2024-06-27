const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { uname, email, pwd } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    req.session.error = "User already exists";
    return res.json({ msg: "User already exists!", statusCode: 2 });
  }

  console.log(pwd);
  const hasdPsw = await bcrypt.hash(pwd, 12);

  user = new User({
    username: uname,
    email: email,
    password: hasdPsw,
  });

  await user.save();
  res.json({ msg: "User Created Successfully", statusCode: 1 });
};

//Status code meanings :
//0 - Invalid creds
//1 - Logged in
//2 - Already logged in

exports.loginUser = async (req, res) => {
  const { email, pwd } = req.body;
  const user = await User.findOne({ email });
  console.log(user._id);
  console.log("session uname : " + req.session.username);

  if (req.session.username == user.username) {
    return res.json({ msg: "Already logged in!", statusCode: 2 });
  }

  if (!user) {
    req.session.error = "Invalid Credentials";
    return res.json({ msg: "Invalid Credentials", statusCode: 0 });
  }

  const isMatch = await bcrypt.compare(pwd, user.password);

  if (!isMatch) {
    req.session.error = "Invalid Credentials";
    return res.json({ msg: "Invalid Credentials", statusCode: 0 });
  }

  req.session.isAuth = true;
  req.session.username = user.username;
  req.session.userid = user._id;
  console.log(req.session.userid);
  res.json({ msg: "You logged in!", statusCode: 1, username: user.username });
};

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ msg: "Error loging out" });
    }

    res.json({ msg: "logged out!" });
  });
};
