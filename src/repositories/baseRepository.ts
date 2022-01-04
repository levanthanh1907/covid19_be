import { IBase } from "../interfaces/BaseInterface";
import { Schema, model, Document, Types } from "mongoose";
import { IMethod } from "./repoInterface/methodInterface";
import { IModel } from "./repoInterface/medelInterface";

type Doc<T> = Document & T;
export class BaseRepository<T extends IBase> implements IMethod<T>, IModel<T> {
  private model;
  constructor(modelName: string, schema: Schema) {
    this.model = model<T>(modelName, schema);
  }

  public async lastId() {
    try {
      const item: T = await this.model.findOne().sort({ id: -1 });
      if (item) return item.id;
      return 0;
    } catch (error) {
      console.log(error);
    }
  }

  public async create(item: T): Promise<T> {
    const id = (await this.lastId()) + 1;
    let newItem = new this.model({
      ...item,
      id,
    });

    try {
      await newItem.save();
      return await this.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  public async update(item: T): Promise<T> {
    try {
      await this.model.updateOne({ id: item.id }, item);
      return await this.findById(item.id);
    } catch (error) {}
  }

  public async delete(id: number): Promise<boolean> {
    try {
      await this.model.deleteOne({ id: id });
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  public async findById(id: number): Promise<T> {
    try {
      return await this.model.findOne({ id: id });
    } catch (error) {
      console.log(error);
    }
  }

  public async findAll(): Promise<T[]> {
    try {
      return await this.model.find();
    } catch (error) {}
  }

  public async findByName(name: string): Promise<T> {
    try {
      return await this.model.findOne({ name: name });
    } catch (error) {}
  }

  
  public async SaveAndUpdate(item: T): Promise<T> {
    try {
      await this.model.updateOne({ id: item.id }, item);
      return await this.findById(item.id);
    } catch (error) {
      throw error;
    }
  }

}
