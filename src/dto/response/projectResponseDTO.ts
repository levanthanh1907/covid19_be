import { IResponse } from "../../interfaces/responseInterface";
import { MemberType, ProjectStatus, ProjectType } from "../../type/projectType";

export interface GetProjectResDTO extends IResponse {
  result: {
    name: string;
    properties: string;
    status: ProjectStatus;
    timeStart: Date;
    timeEnd: Date;
    projectType: ProjectType;
    tasks: {
      taskId: number;
      billable: boolean;
      id: number;
    }[];
    users: {
      userId: number;
      type: MemberType;
      id: number;
    }[];
    note: string;
    isAllUserBelongTo: boolean;
  };
}
