import { IResponse } from "../../interfaces/responseInterface";

export interface AuthResponseDTO extends IResponse {
  result:
    | {
        accessToken: string;
        encryptedAccessToken: string;
        expireInSeconds: number;
        userId: number;
      }
    | string;
}