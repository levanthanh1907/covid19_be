import { Document } from "mongoose";
import { TreatmentHospital, Sex } from "../type/userType";
import { IBase } from "./baseInterface";

export interface IUser extends IBase, Document {
  id: number;
  userName: string;
  password: string;
  timeStart: Date;
  timeEnd: Date;
  emailAddress: string;
  name: string;
  surname: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  roleNames: string[];
  avatarPath: string;
  TreatmentHospital: TreatmentHospital;
  sex: Sex;
}
