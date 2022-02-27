import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ProjectDTO } from "../dto/Request/projectReqDTO";
import { IResponse } from "../interfaces/responseInterface";
import { IService } from "../interfaces/serviceInterface";
import ProjectTaskRepository from "../repositories/ProjectTaskRepository";
import ProjectUserRepository from "../repositories/ProjectUserRepository";
import UserRepository from "../repositories/UserRepository";
import get from "../middleware/get";
import { GetProjectResDTO } from "../dto/Response/projectResponseDTO";
import ProjectRepository from "../repositories/ProjectRepository";
import { IProjectUser } from "../interfaces/ProjectUserInterface";

class ProjectService implements IService {
  defaultMethod(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    throw new Error("Method not implemented.");
  }
  private projectRepository = ProjectRepository;
  private projectTaskRepository = ProjectTaskRepository;
  private projectUserRepository = ProjectUserRepository;
  private userRepository = UserRepository;
  default = (req: Request, res: Response, next: NextFunction) => {};

  Save = async (req: Request, res: Response, next: NextFunction) => {
    const project: ProjectDTO = req.body;
    const { tasks, users } = project;
    let response: GetProjectResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      if (project.id) {
        if (await this.projectRepository.findById(project.id)) {
          await this.projectTaskRepository.deleteTaskProject(project.id);
          await this.projectUserRepository.deleteUserProject(project.id);

          for (let task of tasks) {
            await this.projectTaskRepository.createProjectTask(
              task.taskId,
              task.projectId,
              task.billable
            );
          }

          for (let user of users) {
            await this.projectUserRepository.createProjectUser(
              user.projectId,
              user.userId,
              user.type
            );
          }
          let editProject = await this.projectRepository.update(project);
          editProject = get(editProject, [
            "note",
            "status",
            "name",
            "properties",
            "projectType",
            "customerId",
            "isAllUserBelongTo",
            "id",
            "timeStart",
            "timeEnd",
          ]);
          response = {
            ...response,
            success: true,
            result: {
              ...editProject,
              tasks: tasks.map((task) => {
                return {
                  id: task.id,
                  taskId: task.taskId,
                  billable: task.billable,
                };
              }),
              users: users.map((user) => {
                return {
                  id: user.id,
                  userId: user.userId,
                  type: user.type,
                };
              }),
            },
          };
          res.status(200).json(response);
        } else {
          response = {
            ...response,
            error: {
              code: 0,
              message: `Project id ${project.id}`,
              details: null,
              validationErrors: null,
            },
          };
          res.status(500).json(response);
        }
      } else {
        if (!(await this.projectRepository.findByName(project.name))) {
          let createProject = await this.projectRepository.createProject(
            project
          );
          createProject = get(createProject, [
            "note",
            "status",
            "name",
            "properties",
            "projectType",
            "customerId",
            "isAllUserBelongTo",
            "id",
            "timeStart",
            "timeEnd",
          ]);

          for (let task of tasks) {
            await this.projectTaskRepository.createProjectTask(
              task.taskId,
              createProject.id,
              task.billable
            );
          }

          for (let user of users) {
            await this.projectUserRepository.createProjectUser(
              user.userId,
              createProject.id,
              user.type
            );
          }
          response = {
            ...response,
            result: {
              ...createProject,
              tasks: tasks.map((task) => {
                return {
                  id: task.id,
                  taskId: task.taskId,
                  billable: task.billable,
                };
              }),
              users: users.map((user) => {
                return {
                  id: user.id,
                  userId: user.userId,
                  type: user.type,
                };
              }),
            },
            success: true,
          };
          res.status(200).json(response);
        } else {
          response = {
            ...response,
            error: {
              code: 0,
              message: `Project ${project.name} is already exist!`,
              details: null,
              validationErrors: null,
            },
          };
          res.status(500).json(response);
        }
      }
    } catch (error) {
      next(error);
    }
  };

  Delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id as string;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      if (await this.projectRepository.findById(parseInt(id))) {
        await this.projectRepository.deleteProject(parseInt(id));
        await this.projectTaskRepository.deleteTaskProject(parseInt(id));
        await this.projectUserRepository.deleteUserProject(parseInt(id));
        response = {
          ...response,
          result: "Delete project successfully",
          success: true,
        };
        res.status(200).json(response);
      } else {
        response = {
          ...response,
          error: {
            code: 0,
            message: `Not found ${id}!`,
            details: null,
            validationErrors: null,
          },
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  active = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id as string;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      if (await this.projectRepository.findById(parseInt(id))) {
        await this.projectRepository.active(parseInt(id));
        response = {
          ...response,
          success: true,
        };
        res.status(200).json(response);
      } else {
        response = {
          ...response,
          error: {
            code: 0,
            message: `This projectId ${id} is in a project, You can't active project`,
            details: null,
            validationErrors: null,
          },
        };
        res.status(500).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  Inactive = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.query.id as string;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      if (await this.projectRepository.findById(parseInt(id))) {
        await this.projectRepository.inActive(parseInt(id));
        response = {
          ...response,
          success: true,
        };
        res.status(200).json(response);
      } else {
        response = {
          ...response,
          error: {
            code: 0,
            message: `This ProjectId ${id} is in a project ,You can't inactive project`,
            details: null,
            validationErrors: null,
          },
        };
        res.status(500).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.query.id as string;
    let response: GetProjectResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      let project = await this.projectRepository.findById(parseInt(projectId));
      const tasks = await this.projectTaskRepository.findByProjectId(
        parseInt(projectId)
      );
      const users = await this.projectUserRepository.findByProjectId(
        parseInt(projectId)
      );
      project = get(project, [
        "name",
        "properties",
        "status",
        "note",
        "timeStart",
        "timeEnd",
        "projectType",
        "customerId",
        "id",
        "isAllUserBelongTo",
      ]);
      response.success = true;
      response.result = {
        ...project,
        tasks: tasks.map((task) => {
          return {
            id: task.id,
            taskId: task.taskId,
            billable: task.billable,
          };
        }),
        users: users.map((user) => {
          return {
            id: user.id,
            userId: user.userId,
            type: user.type,
          };
        }),
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    let { status, search } = req.query;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      let result = [];
      let project = await this.projectRepository.findStatus(
        parseInt(status as string),
        search as string
      );
      for (let item of project) {
        let getMember = await this.projectUserRepository.getMemberProject(
          item.id
        );
        let getManage = await this.userRepository.getManageProject(item.id);
        let getProject = get(item, [
          "activeMember",
          "code",
          "id",
          "name",
          "pms",
          "projectType",
          "status",
          "timeEnd",
          "timeStart",
        ]);
        let getall = {
          ...getProject,
          activeMember: getMember,
          pms: getManage,
        };
        result.push(getall);
      }
      response = {
        ...response,
        result: result,
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getUserByProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let response: IResponse = {
        result: null,
        targetUrl: null,
        success: false,
        error: null,
        unAuthRequest: false,
        __abp: true,
      };

      const { name } = req.params;
      const project = await this.projectRepository.findProjectByName(name);
      if (!project)
        return res
          .status(400)
          .json({ success: false, message: "Not found project by name" });
      const { id } = project;

      const projectUser = await this.projectUserRepository.findByProjectId(id);

      if (Array.isArray(projectUser) && projectUser.length === 0)
        return res
          .status(400)
          .json({ success: false, message: "Not found project user" });

      const userid = projectUser.map((user) => user.userId);

      const user = await Promise.all(
        userid.map((id) => this.userRepository.findUserById(id))
      );
      if (Array.isArray(user) && user.length === 0)
        return res
          .status(400)
          .json({ success: false, message: "Not found user" });
      response = {
        ...response,
        success: true,
        result: user,
      };
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  };
}
export = new ProjectService();
