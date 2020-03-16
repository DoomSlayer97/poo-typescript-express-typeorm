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
var User_1 = require("../models/User");
var Validator = require("validatorjs");
var Paginator_1 = require("../helpers/Paginator");
var State_1 = require("../models/State");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    //FUNCIONES CRUD
    UserController.prototype.findAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findedUsers, pagination;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find({
                            where: { regStatus: 1 },
                            join: {
                                alias: 'user',
                                leftJoinAndSelect: {
                                    "state": "user.state",
                                    "country": "state.country"
                                }
                            }
                        })];
                    case 1:
                        findedUsers = _a.sent();
                        pagination = Paginator_1.paginate(findedUsers, req.query.page, req.query.items);
                        return [2 /*return*/, res.status(200).json({
                                users: pagination.data,
                                pagination: pagination
                            })];
                }
            });
        });
    };
    UserController.prototype.findOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.params.id, {
                            join: {
                                alias: 'user',
                                leftJoinAndSelect: {
                                    "state": "user.state",
                                    "country": "state.country"
                                }
                            }
                        })];
                    case 1:
                        findedUser = _a.sent();
                        if (!findedUser)
                            return [2 /*return*/, res.status(404).json({
                                    message: 'No se encontro el registro'
                                })];
                        return [2 /*return*/, res.status(200).json({
                                user: findedUser,
                            })];
                }
            });
        });
    };
    UserController.prototype.updateOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reqParams, validator, userRepository, findedUser, updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqParams = req.body;
                        reqParams.id = req.params.id;
                        validator = new Validator(reqParams, {
                            firstName: 'required|string',
                            lastName: 'required|string',
                            age: 'required|integer',
                            email: 'required|email',
                            id: 'required|integer'
                        });
                        if (validator.fails())
                            return [2 /*return*/, res.status(500).json({
                                    message: 'errores de campos',
                                    errors: validator.errors.errors
                                })];
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne(req.params.id)];
                    case 1:
                        findedUser = _a.sent();
                        findedUser.firstName = req.body.firstName;
                        findedUser.lastName = req.body.lastName;
                        findedUser.age = req.body.age;
                        findedUser.email = req.body.email;
                        return [4 /*yield*/, userRepository.save(findedUser)];
                    case 2:
                        updatedUser = _a.sent();
                        if (!updatedUser)
                            return [2 /*return*/, res.status(500).json({
                                    message: 'No se guardo correctamente'
                                })];
                        return [2 /*return*/, res.status(200).json({
                                message: 'Se guardo de manera correcta',
                                user: updatedUser
                            })];
                }
            });
        });
    };
    UserController.prototype.createOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reqParams, validator, findedState, newUser, createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqParams = req.body;
                        validator = new Validator(reqParams, {
                            firstName: 'required|string',
                            lastName: 'required|string',
                            age: 'required|integer',
                            email: 'required|email',
                            stateId: 'required|integer'
                        }, {});
                        if (validator.fails())
                            return [2 /*return*/, res.status(500).json({
                                    message: 'errores de campos',
                                    errors: validator.errors.errors
                                })];
                        return [4 /*yield*/, typeorm_1.getRepository(State_1.State).findOne(req.body.stateId)];
                    case 1:
                        findedState = _a.sent();
                        newUser = new User_1.User();
                        newUser.firstName = req.body.firstName;
                        newUser.lastName = req.body.lastName;
                        newUser.age = req.body.age;
                        newUser.email = req.body.email;
                        newUser.state = findedState;
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
                    case 2:
                        createdUser = _a.sent();
                        if (!createdUser)
                            return [2 /*return*/, res.status(400).json({
                                    message: 'error al guardar'
                                })];
                        return [2 /*return*/, res.status(200).json({
                                message: 'guardar',
                                user: createdUser
                            })];
                }
            });
        });
    };
    UserController.prototype.deleteOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, findedUser, updatedUser, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne(req.params.id)];
                    case 1:
                        findedUser = _a.sent();
                        findedUser.regStatus = 0;
                        return [4 /*yield*/, userRepository.save(findedUser)];
                    case 2:
                        updatedUser = _a.sent();
                        if (!updatedUser)
                            return [2 /*return*/, res.status(500).json({
                                    message: 'No se elimino correctamente'
                                })];
                        return [2 /*return*/, res.status(200).json({
                                message: 'Se elimino de manera correcta',
                                user: updatedUser
                            })];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                message: 'Ocurrio un error en el servidor'
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map