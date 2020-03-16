"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var UserRouter = /** @class */ (function () {
    //Se le indicia que el router tiene las rutas definidas en la funcion routes()
    //tambien se le declara un prefijo para identificar el contexto en esto caso user
    function UserRouter() {
        this.router = express_1.Router();
        this.prefix = '/user';
        this.router.use(this.prefix, this.middlewares());
        this.router.use(this.prefix, this.routes());
    }
    UserRouter.prototype.middlewares = function () {
        var middlewares = [
            function (req, res, next) {
                console.log('You are on User\'s ApiREST');
                next();
            }
        ];
        return middlewares;
    };
    UserRouter.prototype.routes = function () {
        //se instancia el controlador para poder ser usado en las rutas
        this.userController = new user_controller_1.UserController();
        //ruta final: localhost:puerto/api/user/findall GET
        this.router.get('/findall', this.userController.findAll);
        //ruta final: localhost:puerto/api/user/find GET
        this.router.get('/find/:id', this.userController.findOne);
        //ruta final: localhost:puerto/api/user/ POST
        this.router.post('/', this.userController.createOne);
        //ruta final: localhost:puerto/api/user/ PUT
        this.router.put('/:id', this.userController.updateOne);
        //ruta final: localhost:puerto/api/user/ DELETE
        this.router.delete('/:id', this.userController.deleteOne);
        return this.router;
    };
    return UserRouter;
}());
exports.UserRouter = UserRouter;
//# sourceMappingURL=user.router.js.map