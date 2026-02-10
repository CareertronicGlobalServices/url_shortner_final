//const sessionIdUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "AabraKaDaabra";
function setUser(user) {
  //sessionIdUserMap.set(id, user);
  // const payload = {
  //   id,
  //   ...user,
  // };
  //return jwt.sign(user, secret);
  if (!user) return null;
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      password: user.password,
    },
    secret,
    {
      expiresIn: 20,
    },
  );
}

function getUser(token) {
  //return sessionIdUserMap.get(id);
  //if (!token) return null;
  return jwt.verify(token, secret);
}

// function deleteUser(id) {
//   sessionIdUserMap.delete(id);
// }
module.exports = { setUser, getUser };
