"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var State_1 = require("./State");
var Country = /** @class */ (function () {
    function Country() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Country.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Country.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ default: 1 }),
        __metadata("design:type", Number)
    ], Country.prototype, "regStatus", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return State_1.State; }, function (state) { return state.country; }),
        __metadata("design:type", Array)
    ], Country.prototype, "states", void 0);
    Country = __decorate([
        typeorm_1.Entity()
    ], Country);
    return Country;
}());
exports.Country = Country;
//# sourceMappingURL=Country.js.map