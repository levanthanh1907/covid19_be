import { IResponse } from "../../../interfaces/responseInterface";
import { IUser } from "../../../interfaces/userInterface";

export interface GetAllPaggingResDTO extends IResponse {
  result: {
    totalCount: number;
    items: IUser[];
  };
}
