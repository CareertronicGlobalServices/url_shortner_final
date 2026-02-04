const sessionIdUserMap = new Map();

function setUser(id, user) {
  sessionIdUserMap.set(id, user);
}

function getUser(id) {
  return sessionIdUserMap.get(id);
}

function deleteUser(id) {
  sessionIdUserMap.delete(id);
}
module.exports = { setUser, getUser, deleteUser };
