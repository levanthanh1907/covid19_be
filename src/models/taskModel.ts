import { model, Model, Schema, Types } from "mongoose";
import { ITask } from "../interfaces/taskInterface";
import { TaskType } from "../type/taskType";

export interface ITaskModel extends Model<ITask> {}

export const TaskSchema: Schema = new Schema(
  {
    id: { type: Number, require: true, unique: true },
    name: { type: String, require: true, unique: true },
    type: { type: TaskType },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Task: ITaskModel = model<ITask, ITaskModel>(
  "Task",
  TaskSchema,
  "tasks"
);

TaskSchema.path("name").validate(async (value) => {
  const count = await Task.count({ name: value });
  return !count;
}, "name already exists");
