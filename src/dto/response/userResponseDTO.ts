import { IResponse } from "../../interfaces/responseInterface";
import { IUser } from "../../interfaces/userInterface";

export default interface GetUserResDTO extends IResponse {
  result: IUser[] | string | IUser;
}

type User = Omit<IUser, 'username'>
export interface UserResDTO extends IResponse{
    result: User | string
}

