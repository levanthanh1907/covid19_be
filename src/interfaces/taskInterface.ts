import { Document } from "mongoose";
import { TaskType } from "../type/taskType";
import { IBase } from "./baseInterface";

export interface ITask extends IBase, Document {
  id: number;
  name: string;
  type: TaskType;
  isDeleted: boolean;
}
