import { IResponse } from "../../interfaces/responseInterface";
import { ITask } from "../../interfaces/taskInterface";

type Task = Omit<ITask, "name">;
export interface CreateTaskResDTO extends IResponse {
  result: Task | string;
}
