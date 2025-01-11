import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../classes/Response";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"]?.split("Bearer ")[1];
  if (!token)
    return res
      .status(401)
      .json(new ResponseHandler(false, 401, "No token provided"));

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json(new ResponseHandler(false, 401, "Unauthorized"));
    if (!decoded)
      return res
        .status(401)
        .json(new ResponseHandler(false, 401, "Unauthorized"));

    req.user = decoded;
    next();
  });
};
