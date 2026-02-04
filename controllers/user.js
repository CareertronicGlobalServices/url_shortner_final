const USER = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, deleteUser } = require("../Service/auth");
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  await USER.create({
    name,
    email,
    password,
  });

  return res.redirect("/user/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await USER.findOne({ email, password });
  console.log(user);
  if (!user) return res.render("Login", { error: Invalid });
  const sessionId = uuidv4();
  console.log(sessionId);
  setUser(sessionId, user);
  res.cookie("uid", sessionId, {
    httpOnly: true,
    path: "/",
  });
  console.log("Cookies:", req.cookies);

  return res.redirect("/home");
}

function handleUserLogout(req, res) {
  const sessionId = req.cookies?.uid;

  if (sessionId) {
    deleteUser(sessionId); // remove session
  }

  res.clearCookie("uid"); // remove cookie
  return res.render("LoggedOff");
}

module.exports = { handleUserLogin, handleUserSignUp, handleUserLogout };
