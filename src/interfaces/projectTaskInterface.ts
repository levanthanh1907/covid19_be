import { IBase } from './baseInterface';
import { Document } from 'mongoose';
export interface IProjectTask extends IBase, Document {
    projectId: number;
    taskId: number;
    billable: boolean;
    id: number;
}
