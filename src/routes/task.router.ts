import { Router, Request, Response, RequestParamHandler, RequestHandler, NextFunction } from "express";
import { TaskController } from "../controllers/task.controller";

export class TaskRouter {

    private router = Router();
    private prefix = '/task';
    private taskController: TaskController;

    constructor() {

        this.router.use(this.prefix, this.middlewares());
        this.router.use(this.prefix, this.routes());

    }

    middlewares() {

        let middlewares = [
            (req: Request, res: Response, next: NextFunction) => {

                console.log('You are on Task\'s ApiREST');
                next();
            },
        ]

        return middlewares;

    }

    routes() {

        this.taskController = new TaskController();

        this.router.get('/findall', this.taskController.findAll);
        this.router.get('/find/:id', this.taskController.findOne);
        this.router.get('/find/by/user/:idUser', this.taskController.findTasksByUser);
        this.router.post('/', this.taskController.createOne);
        this.router.put('/', this.taskController.updateOne);
        this.router.delete('/', this.taskController.deleteOne);

        return this.router;

    }

}