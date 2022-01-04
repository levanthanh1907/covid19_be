import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { TaskDTO } from "../dto/request/taskReqDTO";
import { CreateTaskResDTO } from "../dto/response/createTaskResDTO";
import { GetAllTaskResDTO } from "../dto/response/getAll/getAllTaskResDTO";
import { IResponse } from "../interfaces/responseInterface";
import { IService } from "../interfaces/serviceInterface";
import taskRepository from "../repositories/taskRepository";

class TaskService implements IService {
  defaultMethod(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    throw new Error("Method not implemented.");
  }
  private taskRepository = taskRepository;
  default = (req: Request, res: Response, next: NextFunction) => {};

  Save = async (req: Request, res: Response, next: NextFunction) => {
    let task: TaskDTO = req.body;
    let response: CreateTaskResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };

    try {
      if (task.id) {
        let edit = await this.taskRepository.findById(task.id);
        if (edit) {
          let updateTask = await edit.update({
            name: task.name,
          });
          response = {
            ...response,
            success: true,
            result: updateTask,
          };
          res.status(200).json(response);
        } else {
          response = {
            ...response,
            error: {
              code: 0,
              message: `Task id ${task.id} does not exist !!`,
              details: null,
              validationErrors: null,
            },
          };
          res.status(500).json(response);
        }
      } else {
        if (!(await this.taskRepository.findByName(task.name))) {
          let saveTask = await this.taskRepository.create(task);
          response = {
            ...response,
            result: saveTask,
            success: true,
          };
          res.status(200).json(response);
        } else {
          response = {
            ...response,
            error: {
              code: 0,
              message: `Task name ${task.name} already existed !!`,
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
      const deleteTask = await this.taskRepository.delete(parseInt(id));
      response = {
        ...response,
        result: "Delete task successfully",
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    let response: GetAllTaskResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };

    try {
      let getTask = await this.taskRepository.findAll();
      response = {
        ...response,
        success: true,
        result: getTask,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  archive = async (req: Request, res: Response, next: NextFunction) => {
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
      if (await this.taskRepository.findById(parseInt(id))) {
        await this.taskRepository.archiveTask(parseInt(id));
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
            message: `This taskId ${id} is in a project ,You can't delete task`,
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

  deArchive = async (req: Request, res: Response, next: NextFunction) => {
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
      if (await this.taskRepository.findById(parseInt(id))) {
        await this.taskRepository.deArchiveTask(parseInt(id));
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
            message: `This taskId ${id} is in a project ,You can't restore task`,
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
}
export = new TaskService();
