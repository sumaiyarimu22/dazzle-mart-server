const isAdmin = async (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Unauthorize access" });
  }
};
module.exports = { isAdmin };
