import { IProject } from "../../interfaces/projectInterface";
import { IProjectTask } from "../../interfaces/projectTaskInterface";
import { IProjectUser } from "../../interfaces/projectUserInterface";

export interface ProjectDTO extends IProject {
  tasks: [IProjectTask];
  users: [IProjectUser];
}