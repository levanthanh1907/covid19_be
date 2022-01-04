import jwt from "express-jwt";
import config from "../config/config";

export function authorize(roles = []) {
  try {
    if (typeof roles === "string") {
      roles = [roles];
    }
    return [
      jwt({ secret: config.server.token.secret, algorithms: ["HS256"] }),
      (req, res, next) => {
        console.log(req.user);
        if (!roles.some((e) => req.user.role.includes(e))) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        next();
      },
    ];
  } catch (error) {}
}
