const { getUser } = require("../Service/auth");

async function maintainLoggedInUser(req, res, next) {
  const userUid = req.cookies?.uid;
  console.log(userUid);
  if (!userUid) return res.redirect("/user/login");
  const user = await getUser(userUid);
  console.log(user);
  if (!user) return res.redirect("/user/login");
  req.user = user;
  next();
}

module.exports = { maintainLoggedInUser };
