import { Request, Response, NextFunction } from "express";
import { AuthResponseDTO } from "../dto/Response/authResponseDTO";
import bcryptjs from 'bcryptjs';
import {User} from "../models/userModel";
import signJWT from "../middleware/signJWT";
import { IService } from "../interfaces/serviceInterface";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

/**
 * @description AuthServive.
 */

 class AuthServive implements IService {
  defaultMethod(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
    throw new Error("Method not implemented.");
  }

  default = (req: Request, res: Response, next: NextFunction) => { };

  login = (req: Request, res: Response, next: NextFunction) => {
    let { userNameOrEmailAddress, password } = req.body;
    let response: AuthResponseDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };

    User.find({ userName: userNameOrEmailAddress })
      .exec()
      .then((users) => {
        if (users.length !== 1) {
          response = {
            ...response,
            error: {
              code: 0,
              message: "userNameOrEmailAddress doesn't exist!!!",
              details: null,
              validationErrors: null
            }
        }
        return res.status(400).json(response);
        }

        bcryptjs.compare(password, users[0].password, (error, result) => {
          if (error) {
            response = {
              ...response,
              error: {
                  code: 0,
                  message: "Password incorrect",
                  details: null,
                  validationErrors: null
              }
          }
          return res.status(400).json(response);
          } else if (result) {
            signJWT(users[0], (_error, token, expirationTimeInSeconds) => {
              if (_error) {
                return res.status(500).json({
                  message: _error.message,
                  error: _error,
                });
              } else if (token) {
                response.success = true;
                response.result = {
                  accessToken: token,
                  userId: users[0].id,
                  expireInSeconds: expirationTimeInSeconds,
                  encryptedAccessToken: token,
                };
                return res.status(200).json(response);
              }
            });
          }
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  };
}

export = new AuthServive();
