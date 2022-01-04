import { Types } from "mongoose";
import { IRole } from "../interfaces/roleInterface";
import { Role, RoleSchema } from "../models/roleModel";
import { BaseRepository } from "./baseRepository";

class RoleRepository extends BaseRepository<IRole> {
  constructor() {
    super("Role", RoleSchema);
  }

  public async createRole(role: IRole) {
    const id = (await this.lastId()) + 1;
    const newRole: IRole = new Role({
      ...role,
      id,
    });

    try {
      return await newRole.save();
    } catch (error) {
      throw error;
    }
  }

  public async deleteRole(id: number) {
    const role = await Role.findOne({
      id: id,
    });

    try {
      return await role.remove();
    } catch (error) {
      throw error;
    }
  }
}

export = new RoleRepository();
