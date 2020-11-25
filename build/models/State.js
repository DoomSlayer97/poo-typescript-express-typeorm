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
var Country_1 = require("./Country");
var User_1 = require("./User");
var State = /** @class */ (function () {
    function State() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], State.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], State.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ default: 1 }),
        __metadata("design:type", Number)
    ], State.prototype, "regStatus", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Country_1.Country; }, function (country) { return country.states; }),
        __metadata("design:type", Country_1.Country)
    ], State.prototype, "country", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return User_1.User; }, function (user) { return user.state; }),
        __metadata("design:type", Array)
    ], State.prototype, "users", void 0);
    __decorate([
        typeorm_1.Column({ type: 'int', nullable: true }),
        __metadata("design:type", Number)
    ], State.prototype, "countryId", void 0);
    State = __decorate([
        typeorm_1.Entity()
    ], State);
    return State;
}());
exports.State = State;
//# sourceMappingURL=State.js.map