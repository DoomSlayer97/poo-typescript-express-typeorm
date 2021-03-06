"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Task_1 = require("../models/Task");
var User_1 = require("../models/User");
var Validator = require("validatorjs");
var TaskController = /** @class */ (function () {
    function TaskController() {
    }
    //FUNCIONES CRUD
    TaskController.prototype.findAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findedTasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Task_1.Task).find({
                            where: { regStatus: 1 }
                        })];
                    case 1:
                        findedTasks = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                tasks: findedTasks
                            })];
                }
            });
        });
    };
    TaskController.prototype.findTasksByUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findedUser, findedTasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.params.idUser)];
                    case 1:
                        findedUser = _a.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Task_1.Task).find({
                                where: { regStatus: 1, user: findedUser }
                            })];
                    case 2:
                        findedTasks = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                tasks: findedTasks,
                                user: findedUser
                            })];
                }
            });
        });
    };
    TaskController.prototype.findOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findedTask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Task_1.Task).findOne(req.params.id, { relations: ['users'] })];
                    case 1:
                        findedTask = _a.sent();
                        if (!findedTask)
                            return [2 /*return*/, res.status(404).json({
                                    message: 'No se encontro el registro'
                                })];
                        return [2 /*return*/, res.status(200).json({
                                task: findedTask
                            })];
                }
            });
        });
    };
    TaskController.prototype.createOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reqParams, validator, newTask, _a, createdTask;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reqParams = req.body;
                        validator = new Validator(reqParams, {
                            nombre: 'required|string',
                            idUser: 'required|integer'
                        });
                        if (validator.fails())
                            return [2 /*return*/, res.status(400).json({
                                    message: 'error de campos',
                                    errors: validator.errors.errors
                                })];
                        newTask = new Task_1.Task();
                        newTask.nombre = req.body.nombre;
                        _a = newTask;
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.body.idUser)];
                    case 1:
                        _a.user = _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Task_1.Task).save(newTask)];
                    case 2:
                        createdTask = _b.sent();
                        if (!createdTask)
                            return [2 /*return*/, res.status(401).json({
                                    message: 'error al guardar',
                                })];
                        return [2 /*return*/, res.status(200).json({
                                message: 'registro creado',
                                task: createdTask
                            })];
                }
            });
        });
    };
    TaskController.prototype.updateOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var taskRepository, findedTask, _a, updatedTask;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        taskRepository = typeorm_1.getRepository(Task_1.Task);
                        return [4 /*yield*/, taskRepository.findOne(req.body.id)];
                    case 1:
                        findedTask = _b.sent();
                        findedTask.nombre = req.body.name;
                        _a = findedTask;
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.body.idUser)];
                    case 2:
                        _a.user = _b.sent();
                        return [4 /*yield*/, taskRepository.save(findedTask)];
                    case 3:
                        updatedTask = _b.sent();
                        if (!updatedTask)
                            return [2 /*return*/, res.status(401).json({
                                    message: 'error al actualizar'
                                })];
                        return [2 /*return*/, res.status(200).json({
                                message: 'registro actualizado',
                                task: updatedTask
                            })];
                }
            });
        });
    };
    TaskController.prototype.deleteOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var taskRepository, deletedTask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskRepository = typeorm_1.getRepository(Task_1.Task);
                        return [4 /*yield*/, taskRepository.delete(req.body.id)];
                    case 1:
                        deletedTask = _a.sent();
                        if (!deletedTask)
                            return [2 /*return*/, res.status(401).json({
                                    message: 'No se pudo eliminar el registro'
                                })];
                        return [2 /*return*/, res.status(200).json({
                                message: 'registro eliminado',
                                task: deletedTask
                            })];
                }
            });
        });
    };
    return TaskController;
}());
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map