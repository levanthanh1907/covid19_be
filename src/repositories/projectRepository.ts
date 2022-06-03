import { Types } from "mongoose";
import { IProject } from "../interfaces/projectInterface";
import { Project, ProjectSchema } from "../models/projectModel";
import { BaseRepository } from "./baseRepository";

class ProjectRepository extends BaseRepository<IProject> {
  constructor() {
    super("Project", ProjectSchema);
  }

  public async createProject(project: IProject): Promise<IProject> {
    let id = (await this.lastId()) + 1;
    let newProject: IProject = new Project({
      _id: Types.ObjectId(),
      ...project,
      id,
    });
    try {
      await newProject.save();
      return this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async deleteProject(id: number): Promise<boolean> {
    try {
      await Project.deleteOne({ id: id });
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async active(id: number): Promise<boolean> {
    try {
      const project = await Project.findOne({ id: id });
      return await project.update({ status: 0 });
    } catch (error) {
      throw error;
    }
  }

  public async inActive(id: number): Promise<boolean> {
    try {
      const project = await Project.findOne({ id: id });
      return await project.update({ status: 1 });
    } catch (error) {
      throw error;
    }
  }

  public async findByProjectId(id: number): Promise<IProject[]> {
    try {
      let project = await Project.find({ id });
      return project;
    } catch (error) {
      throw error;
    }
  }

  public async findStatus(status: number, search: string): Promise<IProject[]> {
    try {
      let findProject = new RegExp(search, "i");
      if (status == 0) {
        return await Project.find({ status: 0, name: findProject });
      } else if (status == 1) {
        return await Project.find({ status: 1, name: findProject });
      } else {
        return await Project.find({ name: findProject });
      }
    } catch (error) {}
  }

  public async findProjectByName(name: string) {
    try {
      const project = await Project.findOne({ name });

      if (!project) return;
      return project;
    } catch (error) {
      console.log(error);
    }
  }
}

export = new ProjectRepository();
