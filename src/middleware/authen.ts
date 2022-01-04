import { NextFunction, Request, Response } from "express";
import { IResponse } from "../interfaces/responseInterface";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const authen = (req: Request, res: Response, next: NextFunction) => {
  let response: IResponse = {
    result: null,
    targetUrl: null,
    success: false,
    error: {
      code: 0,
      message: "Currently the user is not logged in !!",
      details: null,
      validationErrors: null,
    },
    unAuthRequest: true,
    __abp: true,
  };

  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(token, config.server.token.secret, (error, decoded) => {
        if (error) {
          return res.status(400).json({
            message: error.message,
            error,
          });
        } else {
          res.locals.jwt = decoded;
          (req as any).user = decoded;
          next();
        }
      });
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.status(401).json(response);
  }
};

