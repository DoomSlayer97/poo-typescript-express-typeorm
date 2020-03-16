"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var state_controller_1 = require("../controllers/state.controller");
var StateRouter = /** @class */ (function () {
    function StateRouter() {
        this.router = express_1.Router();
        this.prefix = '/state';
        this.router.use(this.prefix, this.routes());
    }
    StateRouter.prototype.routes = function () {
        this.stateController = new state_controller_1.StateController();
        this.router.get('/findall/by/country/:idCountry', this.stateController.findByCountry);
        this.router.get('/find/:id', this.stateController.findOne);
        this.router.post('/', this.stateController.createOne);
        this.router.delete('/', this.stateController.deleteOne);
        return this.router;
    };
    return StateRouter;
}());
exports.StateRouter = StateRouter;
//# sourceMappingURL=state.router.js.map