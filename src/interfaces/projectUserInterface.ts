import { IBase } from "./baseInterface";
import { Document } from "mongoose";
import { MemberType } from "../type/projectType";

export interface IProjectUser extends IBase, Document {
  projectId: number;
  userId: number;
  type: MemberType;
  id: number;
}
