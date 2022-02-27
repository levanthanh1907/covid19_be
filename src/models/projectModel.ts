import { model, Model, Schema, Types } from "mongoose";
import { IProject } from "../interfaces/ProjectInterface";
import { ProjectStatus, ProjectType } from "../type/projectType";

export interface IProjectModel extends Model<IProject> {}

export const ProjectSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    name: { type: String, require: true, unique: true },
    properties: { type: String, require: true, unique: true },
    status: { type: Number, enum: Object.values(ProjectStatus) },
    timeStart: { type: Date, default: Date.now },
    timeEnd: { type: Date, default: Date.now },
    projectType: { type: ProjectType, enum: Object.values(ProjectType) },
    customerId: { type: Number },
    note: { type: String, default: null },
    isAllUserBelongTo: { type: Boolean },
    id: { type: Number, require: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const Project: IProjectModel = model<IProject, IProjectModel>(
  "Project",
  ProjectSchema,
  "projects"
);

ProjectSchema.path("name").validate(async (value) => {
  const count = await Project.count({ name: value });
  return !count;
}, "name already exists");