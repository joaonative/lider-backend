import jwt from "jsonwebtoken";
import { parse } from "cookie";

export function authMiddleware(req, res, next) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.jwt_token;

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    req.user = { id: decoded.userId };
    next();
  });
}
