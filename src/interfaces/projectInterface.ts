import { IBase } from "./baseInterface";
import { Document } from "mongoose";
import { ProjectStatus, ProjectType } from "../type/projectType";

export interface IProject extends IBase, Document {
  id: number;
  name: string;
  properties: string;
  status: ProjectStatus;
  timeStart: Date;
  timeEnd: Date;
  projectType: ProjectType;
  customerId: number;
  note: string;
  isAllUserBelongTo: boolean;
}
