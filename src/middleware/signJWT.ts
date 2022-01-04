import jwt from "jsonwebtoken";
import config from "../config/config";
import logging from "../config/logging";
import { IUser } from "../interfaces/userInterface";

const NAMESPACE = "Auth";

const signJWT = (
  user: IUser,
  callback: (
    error: Error | null,
    token: string | null,
    expirationTimeInSeconds: number | null
  ) => void
): void => {
  var timeSinchEpoch = new Date().getTime();
  var expirationTime =
    timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
  var expirationTimeInseconds = Math.floor(expirationTime / 1000);

  logging.info(NAMESPACE, `Attempting to sign token for ${user.userName}`);

  try {
    jwt.sign(
      {
        username: user.userName,
        role: user.roleNames,
      },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: expirationTimeInseconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null, null);
        } else if (token) {
          callback(null, token, expirationTimeInseconds);
        }
      }
    );
  } catch (error) {
    callback(error, null, null);
  }
};

export default signJWT;
