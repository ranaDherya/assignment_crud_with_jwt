const jwt = require("jsonwebtoken");
const users = require("../app");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        const refreshToken = req.cookies.JWTRefreshToken;

        if (!refreshToken) {
          res
            .status(400)
            .json({ error: "Refresh token also expired. Please login again" });
          return;
        }

        const decodedData = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_TOKEN_SECRET
        );

        const user = {};
        for (let i = 0; i < users.length; i++) {
          if (users[i].username === decodedData.username) {
            user = users[i];
          }
        }

        const newToken = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        }); // token will expire in 2mins
        res.status(400).json({
          message: "Old Token expired. Generated new token.",
          token: newToken,
        });
      }
    } else next();
  });
};
