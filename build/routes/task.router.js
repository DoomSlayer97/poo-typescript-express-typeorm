"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var task_controller_1 = require("../controllers/task.controller");
var TaskRouter = /** @class */ (function () {
    function TaskRouter() {
        this.router = express_1.Router();
        this.prefix = '/task';
        this.router.use(this.prefix, this.middlewares());
        this.router.use(this.prefix, this.routes());
    }
    TaskRouter.prototype.middlewares = function () {
        var middlewares = [
            function (req, res, next) {
                console.log('You are on Task\'s ApiREST');
                next();
            },
        ];
        return middlewares;
    };
    TaskRouter.prototype.routes = function () {
        this.taskController = new task_controller_1.TaskController();
        this.router.get('/findall', this.taskController.findAll);
        this.router.get('/find/:id', this.taskController.findOne);
        this.router.get('/find/by/user/:idUser', this.taskController.findTasksByUser);
        this.router.post('/', this.taskController.createOne);
        this.router.put('/', this.taskController.updateOne);
        this.router.delete('/', this.taskController.deleteOne);
        return this.router;
    };
    return TaskRouter;
}());
exports.TaskRouter = TaskRouter;
//# sourceMappingURL=task.router.js.map