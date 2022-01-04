import { IBase } from "../../interfaces/baseInterface";

export interface IMethod<T extends IBase>{
    create(item: T): Promise<T>;
    update(item: T): Promise<T>;
    delete(item: number): Promise<boolean>;
}