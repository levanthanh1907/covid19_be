import { model, Model, Schema, Types } from "mongoose";
import { IProjectUser } from "../interfaces/projectUserInterface";

export interface IProjectUserModel extends Model<IProjectUser> {}

export const ProjectUserSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    projectId: { type: Number},
    userId: { type: Number},
    type: { type: Number},
    id: { type: Number},
  },
  {
    timestamps: true,
  }
);

export const ProjectUser: IProjectUserModel = model<IProjectUser, IProjectUserModel>(
    "ProjectUser",
    ProjectUserSchema,
    "projectusers"
  );