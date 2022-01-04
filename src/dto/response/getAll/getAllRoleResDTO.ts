import { IResponse } from "../../../interfaces/responseInterface";
import { IRole } from "../../../interfaces/roleInterface";

export interface GetAllRoleResDTO extends IResponse {
  result: IRole[];
}
