import { IResponse } from "../../../interfaces/responseInterface";
import { IUser } from "../../../interfaces/userInterface";

export interface GetAllUserResDTO extends IResponse {
  result: IUser[];
}
