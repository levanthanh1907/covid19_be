import { Types } from "mongoose";
import { ITask } from "../interfaces/taskInterface";
import { Task, TaskSchema } from "../models/taskModel";
import { BaseRepository } from "./baseRepository";

class TaskRepository extends BaseRepository<ITask> {
  constructor() {
    super("Task", TaskSchema);
  }

  public async createTask(task: ITask) {
    const id = (await this.lastId()) + 1;
    const newTask: ITask = new Task({
      ...task,
      id,
    });

    try {
      return await newTask.save();
    } catch (error) {
      throw error;
    }
  }

  public async deleteTask(id: number) {
    const task = await Task.findOne({
      id: id,
    });

    try {
      return await task.remove();
    } catch (error) {
      throw error;
    }
  }

  public async archiveTask(id: number) {
    const task = await Task.findOne({
      id: id,
    });
    try {
      return await task.update({ isDeleted: true });
    } catch (error) {
      throw error;
    }
  }
  public async deArchiveTask(id: number) {
    const task = await Task.findOne({
      id: id,
    });
    try {
      return await task.update({ isDeleted: false });
    } catch (error) {
      throw error;
    }
  }
}
export = new TaskRepository();
