import { Handler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";
import { User } from "../entities/User";

const authenticated: Handler = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      req.body.user = await User.findOne({
        where: {
          id: decoded['id']
        }
      });

      if (!req.body.user) {
        return res.status(401).json({ error: "Not authorized" })
      }

      next();
    } catch (e) {
      return res.status(401).json({ error: "Not authorized" })
    }
  } else {
    return res
      .status(401)
      .json({ error: "Not authorized" })
  }
}

export { authenticated }
