import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { getRoleReqDTO } from "../dto/request/roleReqDTO";
import { GetAllRoleResDTO } from "../dto/response/getAll/getAllRoleResDTO";
import { getRoleResDTO } from "../dto/response/roleResponseDTO";
import { IResponse } from "../interfaces/responseInterface";
import { IService } from "../interfaces/serviceInterface";
import get from "../middleware/get";
import roleRepository from "../repositories/roleRepository";

class MyTimesheetService implements IService {
  defaultMethod(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    throw new Error("Method not implemented.");
  }
  private roleRepository = roleRepository;

  default = (req: Request, res: Response, next: NextFunction) => {};

  create = async (req: Request, res: Response, next: NextFunction) => {
    let role: getRoleReqDTO = req.body;
    let response: getRoleResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      let newRole = await this.roleRepository.createRole(role);
      newRole = get(newRole, ["id", "name", "displayName", "description"]);
      response = {
        ...response,
        result: {
          ...newRole,
        },
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const role: getRoleReqDTO = req.body;
    let response: getRoleResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      await this.roleRepository.findById(role.id);
      let editRole = await this.roleRepository.update(role);
      editRole = get(editRole, ["id", "name", "displayName", "description"]);
      response = {
        ...response,
        result: {
          ...editRole,
        },
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
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
      const deleteRole = await this.roleRepository.delete(parseInt(id));
      response = {
        ...response,
        result: "Delete role successfully",
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    let response: GetAllRoleResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      let role = await this.roleRepository.findAll();
      response = {
        ...response,
        success: true,
        result: role,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export = new MyTimesheetService();
