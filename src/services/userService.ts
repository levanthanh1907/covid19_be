import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IService } from "../interfaces/serviceInterface";
import userRepository from "../repositories/userRepository";
import { UserDTO } from "../dto/request/userReqDTO";
import GetUserResDTO, { UserResDTO } from "../dto/response/userResponseDTO";
import get from "../middleware/get";
import { GetAllPaggingReqDTO } from "../dto/request/getAllPaggingReqDTO";
import { GetAllPaggingResDTO } from "../dto/response/getAll/getAllPaggingResDTO";
import { GetAllUserResDTO } from "../dto/response/getAll/getAllUserResDTO";
import { IResponse } from "../interfaces/responseInterface";
import { GetAllUserNotPaggingResDTO } from "../dto/response/getAll/getAllUserNotPagging";

class UserService implements IService {
  roleRepository: any;
  defaultMethod(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    throw new Error("Method not implemented.");
  }
  private userRepository = userRepository;
  default = (req: Request, res: Response, next: NextFunction) => {};

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    let user: UserDTO = req.body;
    let response: UserResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };

    try {
      if (
        !user.userName ||
        !user.emailAddress ||
        !user.password ||
        !user.name ||
        !user.surname
      ) {
        response = {
          ...response,
          error: {
            code: 0,
            message: "Your request is not valid!",
            details: null,
            validationErrors: null,
          },
        };
        return res.status(500).json(response);
      }
      const hash = await bcryptjs.hash(user.password, 10);
      user["password"] = hash;
      let newUser = await this.userRepository.createUser(user);
      newUser = get(newUser, [
        "id",
        "userName",
        "timeStart",
        "timeEnd",
        "emailAddress",
        "name",
        "surname",
        "fullName",
        "address",
        "phoneNumber",
        "roleNames",
        "avatarPath",
        "TreatmentHospital",
        "sex",
      ]);
      response = {
        ...response,
        result: newUser,
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    let user: UserDTO = req.body;
    user.fullName = `${user.surname} ${user.name}`;
    let response: GetUserResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      await this.userRepository.findById(user.id);
      let updateUser = await this.userRepository.update(user);
      updateUser = get(updateUser, [
        "id",
        "userName",
        "timeStart",
        "timeEnd",
        "emailAddress",
        "name",
        "surname",
        "fullName",
        "address",
        "phoneNumber",
        "roleNames",
        "avatarPath",
        "TreatmentHospital",
        "sex",
      ]);
      response = {
        ...response,
        result: updateUser,
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
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
      await this.userRepository.deleteUser(parseInt(id));
      response = {
        ...response,
        result: "Delete user successfully",
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.query.id as string;
    let response: GetUserResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };

    try {
      let getUser = await this.userRepository.findById(parseInt(id));
      getUser = get(getUser, [
        "userName",
        "name",
        "surname",
        "emailAddress",
        "timeStart",
        "timeEnd",
        "phoneNumber",
        "address",
        "isActive",
        "fullName",
        "roleNames",
        "type",
        "salary",
        "salaryAt",
        "startDateAt",
        "allowedLeaveDay",
        "userCode",
        "jobTitle",
        "level",
        "registerWorkDay",
        "managerId",
        "branch",
        "sex",
        "avatarPath",
        "morningWorking",
        "morningStartAt",
        "morningEndAt",
        "afternoonWorking",
        "afternoonStartAt",
        "afternoonEndAt",
        "isWorkingTimeDefault",
        "isStopWork",
        "id",
      ]);
      response = {
        ...response,
        success: true,
        result: getUser,
      };
      res.status(200).json(response);
    } catch (error) {
      response = {
        ...response,
        error: {
          code: 0,
          message: `Not Found ${id}`,
          details: null,
          validationErrors: null,
        },
      };
      res.status(404).json(response);
    }
  };

  getUserNotPagging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let response: GetAllUserNotPaggingResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };

    try {
      let user = await this.userRepository.findUserNotPagging();
      response = {
        ...response,
        result: user,
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAllPagging = async (req: Request, res: Response, next: NextFunction) => {
    let filter: GetAllPaggingReqDTO = req.body;
    let response: GetAllPaggingResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      let result = [];
      let paggingUser = await this.userRepository.findAllPaging(
        filter.filterItems,
        filter.skipCount,
        filter.maxResultCount,
        filter.searchText
      );
      for (let user of paggingUser) {
        let list = get(user, [
          "id",
          "userName",
          "timeStart",
          "timeEnd",
          "emailAddress",
          "name",
          "surname",
          "fullName",
          "address",
          "phoneNumber",
          "roleNames",
          "avatarPath",
          "TreatmentHospital",
          "sex",
        ]);
        result.push({
          ...list,
        });
      }
      response = {
        ...response,
        success: true,
        result: {
          totalCount: paggingUser.length,
          items: result,
        },
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // getRole = async (req: Request, res: Response, next: NextFunction) => {
  //   let response: GetRoleResDTO = {
  //     result: null,
  //     targetUrl: null,
  //     success: false,
  //     error: null,
  //     unAuthRequest: false,
  //     __abp: true,
  //   };

  //   try {
  //     let items = [];
  //     let role = await this.roleRepository.findAll();
  //     for (let item of role) {
  //       let getRoles = get(item, [
  //         "id",
  //         "description",
  //         "displayName",
  //         "normalizedName",
  //         "name",
  //       ]);
  //       items.push(getRoles);
  //     }
  //     response = {
  //       ...response,
  //       result: {
  //         items: items,
  //       },
  //       success: true,
  //     };
  //     res.status(200).json(response);
  //   } catch (error) {
  //     response = {
  //       ...response,
  //       error: {
  //         code: 0,
  //         message: "Not Found",
  //         details: null,
  //         validationErrors: null,
  //       },
  //     };
  //     res.status(404).json(response);
  //   }
  // };

  // active = async (req: Request, res: Response, next: NextFunction) => {
  //   let id = req.query.id as string;
  //   let response: IResponse = {
  //     result: null,
  //     targetUrl: null,
  //     success: false,
  //     error: null,
  //     unAuthRequest: false,
  //     __abp: true,
  //   };
  //   try {
  //     if (await this.userRepository.findById(parseInt(id))) {
  //       await this.userRepository.activeUser(parseInt(id));
  //       response = {
  //         ...response,
  //         success: true,
  //       };
  //       res.status(200).json(response);
  //     } else {
  //       response = {
  //         ...response,
  //         error: {
  //           code: 0,
  //           message: `This id ${id} is in a user ,You can't active user`,
  //           details: null,
  //           validationErrors: null,
  //         },
  //       };
  //       res.status(500).json(response);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // deActive = async (req: Request, res: Response, next: NextFunction) => {
  //   let id = req.query.id as string;
  //   let response: IResponse = {
  //     result: null,
  //     targetUrl: null,
  //     success: false,
  //     error: null,
  //     unAuthRequest: false,
  //     __abp: true,
  //   };
  //   try {
  //     if (await this.userRepository.findById(parseInt(id))) {
  //       await this.userRepository.deActiveUser(parseInt(id));
  //       response = {
  //         ...response,
  //         success: true,
  //       };
  //       res.status(200).json(response);
  //     } else {
  //       response = {
  //         ...response,
  //         error: {
  //           code: 0,
  //           message: `This id ${id} is in a user ,You can't deActive user`,
  //           details: null,
  //           validationErrors: null,
  //         },
  //       };
  //       res.status(500).json(response);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // getAllManager = async (req: Request, res: Response, next: NextFunction) => {
  //   let response: GetAllManagerDTO = {
  //     result: null,
  //     targetUrl: null,
  //     success: false,
  //     error: null,
  //     unAuthRequest: false,
  //     __abp: true,
  //   };
  //   try {
  //     let result = [];
  //     let allManager = await this.userRepository.findAllManager();
  //     for (let item of allManager) {
  //       let Manager = get(item, [
  //         "avatarPath",
  //         "brach",
  //         "id",
  //         "isActive",
  //         "jobTitle",
  //         "level",
  //         "name",
  //         "type",
  //         "userCode",
  //       ]);
  //       let getAll = {
  //         ...Manager,
  //       };
  //       result.push(getAll);
  //     }
  //     response = {
  //       ...response,
  //       success: true,
  //       result: result,
  //     };
  //     res.status(200).json(response);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    let response: GetAllUserResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };

    try {
      let getTask = await this.userRepository.findAll();
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

  // updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
  //   let path = req.file.path.slice(6);
  //   let userId = req.body.userId;
  //   let response: IResponse = {
  //     result: null,
  //     targetUrl: null,
  //     success: false,
  //     error: null,
  //     unAuthRequest: false,
  //     __abp: true,
  //   };

  //   try {
  //     if (await this.userRepository.findById(userId)) {
  //       await this.userRepository.changeAvatar(userId, path);
  //       response = {
  //         ...response,
  //         result: path,
  //         success: true,
  //       };
  //       res.status(200).json(response);
  //     } else {
  //       response = {
  //         ...response,
  //         result: null,
  //         error: {
  //           code: 0,
  //           details: null,
  //           message: `No file upload!!`,
  //           validationErrors: null,
  //         },
  //         success: false,
  //       };
  //       res.status(500).json(response);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, adminPassword, newPassword } = req.body;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      await this.userRepository.findById(parseInt(userId));
      let admin = await this.userRepository.findRoleName();
      if (await bcryptjs.compare(adminPassword, admin.password)) {
        const hash = await bcryptjs.hash(newPassword, 10);
        await this.userRepository.updatePass(userId, hash);
        response = {
          ...response,
          result: true,
          success: true,
        };
      } else {
        response = {
          ...response,
          error: {
            code: 0,
            message: `Your request is not valid!`,
            details: null,
            validationErrors: null,
          },
        };
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
export = new UserService();
