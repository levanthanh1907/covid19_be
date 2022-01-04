import { Types } from "mongoose";
import { IUser } from "../interfaces/userInterface";
import { User, UserSchema } from "../models/userModel";
import { BaseRepository } from "./baseRepository";
import projectUserRepository from "./projectUserRepository";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super("User", UserSchema);
  }
  public async createUser(user: IUser) {
    const id = (await this.lastId()) + 1;
    const newUser: IUser = new User({
      _id: Types.ObjectId(),
      ...user,
      avatarPath: "",
      id,
      fullName: `${user.surname} ${user.name}`,
    });

    try {
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(id: number) {
    const user = await User.findOne({
      id: id,
    });

    try {
      return await user.remove();
    } catch (error) {
      throw error;
    }
  }

  public async findAllPaging(
    filterItems: object[],
    skip: number,
    max: number,
    search: string
  ) {
    try {
      let name = new RegExp(search, "i");
      let user = await User.find({ name })
        .select(
          "userName emailAddress name surname fullName address phoneNumber roleNames avatarPath type branch sex"
        )
        .skip(skip)
        .limit(max);
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async changeAvatar(id: number, path: string): Promise<IUser> {
    try {
      await User.updateOne({ id }, { avatarPath: path });
      return this.findById(id);
    } catch (error) {
      throw error;
    }
  }
  
  public async updatePass(userId: number, newPassword: string): Promise<IUser> {
    try {
      await User.updateOne({ id: userId }, { password: newPassword });
      return await this.findById(userId);
    } catch (error) {}
  }

  public async findRoleName() {
    try {
      let roleName = await User.findOne({ roleNames: "Admin" });
      return roleName;
    } catch (error) {
      throw error;
    }
  }
  
  public async getManageProject(projectId: number) {
    try {
      let member = await projectUserRepository.findByProjectId(projectId);
      let pms = [];
      member = member.filter(function (members) {
        return members.type == 1;
      });
      for (let item of member) {
        let user = await this.findById(item.userId);
        pms.push(user.fullName);
      }
      return pms;
    } catch (error) {
      throw error;
    }
  }
}
export = new UserRepository();
