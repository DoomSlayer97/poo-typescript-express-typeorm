"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var country_controller_1 = require("../controllers/country.controller");
var CountryRouter = /** @class */ (function () {
    function CountryRouter() {
        this.router = express_1.Router();
        this.prefix = '/country';
        this.router.use(this.prefix, this.routes());
    }
    CountryRouter.prototype.middlewares = function () {
        var middlewares = [];
        return middlewares;
    };
    CountryRouter.prototype.routes = function () {
        this.countryController = new country_controller_1.CountryController();
        this.router.get('/findall', this.countryController.findAll);
        this.router.get('/find/:id', this.countryController.findOne);
        this.router.post('/', this.countryController.createOne);
        this.router.delete('/', this.countryController.deleteOne);
        return this.router;
    };
    return CountryRouter;
}());
exports.CountryRouter = CountryRouter;
//# sourceMappingURL=country.router.js.map