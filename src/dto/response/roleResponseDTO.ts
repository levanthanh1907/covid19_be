import { IResponse } from "../../interfaces/responseInterface";

export interface getRoleResDTO extends IResponse {
  result: {
    id: number;
    name: string;
    displayName: string;
    description: string;
  };
}
