import { IResponse } from "../../../interfaces/responseInterface";
import { ITask } from "../../../interfaces/taskInterface";

export interface GetAllTaskResDTO extends IResponse{
    result: ITask[];
}