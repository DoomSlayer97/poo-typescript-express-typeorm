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
var Validator = require("validatorjs");
var Country_1 = require("../models/Country");
var State_1 = require("../models/State");
var Paginator_1 = require("../helpers/Paginator");
var StateController = /** @class */ (function () {
    function StateController() {
    }
    StateController.prototype.findByCountry = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findedCountry, findedStates, pagination;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Country_1.Country).findOne(req.params.idCountry)];
                    case 1:
                        findedCountry = _a.sent();
                        if (!findedCountry)
                            return [2 /*return*/, res.status(404).json({
                                    message: 'Country no encontrado'
                                })];
                        return [4 /*yield*/, typeorm_1.getRepository(State_1.State).find({
                                where: { country: findedCountry }
                            })];
                    case 2:
                        findedStates = _a.sent();
                        pagination = Paginator_1.paginate(findedStates, req.query.page, req.query.items);
                        return [2 /*return*/, res.status(201).json({
                                country: findedCountry,
                                states: pagination.data,
                                pagination: pagination
                            })];
                }
            });
        });
    };
    StateController.prototype.findOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findedState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(State_1.State).findOne(req.params.id)];
                    case 1:
                        findedState = _a.sent();
                        if (!findedState)
                            return [2 /*return*/, res.status(404).json({
                                    message: 'no se encontro el state'
                                })];
                        return [2 /*return*/, res.status(200).json({
                                state: findedState
                            })];
                }
            });
        });
    };
    StateController.prototype.deleteOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var stateRepository, findedState, deletedSate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stateRepository = typeorm_1.getRepository(State_1.State);
                        return [4 /*yield*/, stateRepository.findOne(req.body.id)];
                    case 1:
                        findedState = _a.sent();
                        findedState.regStatus = 0;
                        return [4 /*yield*/, stateRepository.save(findedState)];
                    case 2:
                        deletedSate = _a.sent();
                        if (!deletedSate)
                            return [2 /*return*/, res.status(401).json({
                                    message: 'state no puedo ser eliminado'
                                })];
                        return [2 /*return*/, res.status(200).json({
                                message: 'state eliminado',
                                state: deletedSate
                            })];
                }
            });
        });
    };
    StateController.prototype.createOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reqParams, validator, findedCountry, newState, createdState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqParams = req.body;
                        validator = new Validator(reqParams, {
                            name: 'required|string',
                            countryId: 'required'
                        });
                        if (validator.fails())
                            return [2 /*return*/, res.status(500).json({
                                    message: 'errores de campos',
                                    errors: validator.errors.errors
                                })];
                        return [4 /*yield*/, typeorm_1.getRepository(Country_1.Country).findOne(req.body.countryId)];
                    case 1:
                        findedCountry = _a.sent();
                        newState = new State_1.State();
                        newState.name = req.body.name;
                        newState.country = findedCountry;
                        return [4 /*yield*/, typeorm_1.getRepository(State_1.State).save(newState)];
                    case 2:
                        createdState = _a.sent();
                        if (!createdState)
                            return [2 /*return*/, res.status(401).json({
                                    message: 'error al guardar'
                                })];
                        return [2 /*return*/, res.status(200).json({
                                message: 'state guardado',
                                state: createdState
                            })];
                }
            });
        });
    };
    return StateController;
}());
exports.StateController = StateController;
//# sourceMappingURL=state.controller.js.map