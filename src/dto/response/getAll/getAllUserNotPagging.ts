import { IResponse } from "../../../interfaces/responseInterface";
import { TreatmentHospital } from "../../../type/userType";

interface User {
  id: number;
  fullName: string;
  avatarPath: string;
  TreatmentHospital: TreatmentHospital;
}

export interface GetAllUserNotPaggingResDTO extends IResponse {
  result: User[];
}
