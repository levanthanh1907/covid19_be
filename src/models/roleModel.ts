import { model, Model, Schema, Types } from "mongoose";
import { IRole } from "../interfaces/roleInterface";

export interface IRoleModel extends Model<IRole> {}

export const RoleSchema: Schema = new Schema({
  id: { type: Number, require: true, unique: true },
  userId: { type: Number },
  name: { type: String, require: true, unique: true },
  displayName: { type: String },
  description: { type: String, default: null },
});
export const Role: IRoleModel = model<IRole, IRoleModel>(
  "Role",
  RoleSchema,
  "roles"
);
