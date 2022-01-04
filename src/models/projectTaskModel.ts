import { model, Model, Schema, Types } from "mongoose";
import { IProjectTask } from "../interfaces/projectTaskInterface";

export interface IProjectTaskModel extends Model<IProjectTask> {}

export const ProjectTaskSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    projectId: { type: Number},
    taskId: { type: Number},
    billable: { type: Boolean},
    id: { type: Number},
  },
  {
    timestamps: true,
  }
);

export const ProjectTask: IProjectTaskModel = model<IProjectTask, IProjectTaskModel>(
    "ProjectTask",
    ProjectTaskSchema,
    "projecttasks"
  );