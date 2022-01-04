import { Types } from "mongoose";
import { IProjectUser } from "../interfaces/ProjectUserInterface";
import { ProjectUser, ProjectUserSchema } from "../models/projectUserModel";
import { BaseRepository } from "./baseRepository";

class ProjectUserRepository extends BaseRepository<IProjectUser> {
  constructor() {
    super("ProjectUser", ProjectUserSchema);
  }
  public async createProjectUser(userId: number, projectId: number, type: number) {
    const id = (await this.lastId()) + 1;
    const newProjectUser: IProjectUser = new ProjectUser({
      _id: Types.ObjectId(),
      projectId,
      userId,
      type,
      id,
    });
    try {
      await newProjectUser.save();
      return this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async findByUserId(userId: number) {
    try {
      return await ProjectUser.find({ userId });
    } catch (error) {
      throw error;
    }
  }

  public async deleteUserProject(id: number){
    try {
      await ProjectUser.deleteOne({ id: id });
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async findByProjectId(projectId: number): Promise<IProjectUser[]> {
    try {
      let project = await ProjectUser.find({ projectId });
      return project;
    } catch (error) {
      throw error;
    }
  }

  public async getMemberProject(projectId: number) {
    try {
      let members = await ProjectUser.find({ projectId });
      members = members.filter(function(member){
        return member.type != 2;
      })
      return members.length;
    } catch (error) {
      throw error;
    }
  }
}
export = new ProjectUserRepository();
