import { Router, Request, Response } from "express";
import { getRepository, getConnectionManager, Repository, useContainer } from 'typeorm'
import { Task } from "../models/Task";
import { User } from "../models/User";
import { paginate } from "../helpers/Paginator";
import * as Validator from 'validatorjs'

export class TaskController {

    //FUNCIONES CRUD
    async findAll(req: Request, res: Response) {

        let findedTasks: Task[] = await getRepository(Task).find({
            where: { regStatus: 1 }
        });

        return res.status(200).json({
            tasks: findedTasks
        });

    }

    async findTasksByUser(req: Request, res: Response) {

        let findedUser = await getRepository(User).findOne(req.params.idUser);

        let findedTasks: Task[] = await getRepository(Task).find({
            where: { regStatus: 1, user: findedUser  }
        });

        return res.status(200).json({
            tasks: findedTasks,
            user: findedUser
        });

    }

    async findOne(req: Request, res: Response) {

        let findedTask: Task = await getRepository(Task).findOne(req.params.id,{ relations: ['users'] });

        if(!findedTask) return res.status(404).json({
            message: 'No se encontro el registro'
        })

        return res.status(200).json({
            task: findedTask
        });

    }

    async createOne(req: Request, res: Response) {

        let reqParams = req.body;

        let validator = new Validator(reqParams, {
            nombre: 'required|string',
            idUser: 'required|integer'
        });

        if(validator.fails()) return res.status(400).json({
            message: 'error de campos',
            errors: validator.errors.errors
        });

        let newTask: Task = new Task();

        newTask.nombre = req.body.nombre;
        newTask.user = await getRepository(User).findOne(req.body.idUser);

        let createdTask: Task = await getRepository(Task).save(newTask);

        if(!createdTask) return res.status(401).json({
            message: 'error al guardar',
        });

        return res.status(200).json({
            message: 'registro creado',
            task: createdTask
        });

    }

    async updateOne(req: Request, res: Response) {

        let taskRepository: Repository<Task> = getRepository(Task);
    
        let findedTask: Task = await taskRepository.findOne(req.body.id);
        
        findedTask.nombre = req.body.name;
        findedTask.user = await getRepository(User).findOne(req.body.idUser);

        let updatedTask: Task = await taskRepository.save(findedTask);

        if(!updatedTask) return res.status(401).json({
            message: 'error al actualizar'
        });

        return res.status(200).json({
            message: 'registro actualizado',
            task: updatedTask
        });

    }

    async deleteOne(req: Request, res: Response) {

        let taskRepository: Repository<Task> = getRepository(Task);

        let deletedTask = await taskRepository.delete(req.body.id);

        if(!deletedTask) return res.status(401).json({
            message: 'No se pudo eliminar el registro'
        });

        return res.status(200).json({
            message: 'registro eliminado',
            task: deletedTask
        });

    }

}