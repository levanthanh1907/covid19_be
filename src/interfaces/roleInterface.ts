import { Document } from 'mongoose';
import { IBase } from './baseInterface';

export interface IRole extends IBase,Document{
  id: number;
  name: string;
  displayName: string;
  description: string;
}