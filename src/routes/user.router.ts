import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRouter {

    private router = Router();
    private prefix = '/user';
    private userController: UserController;

    //Se le indicia que el router tiene las rutas definidas en la funcion routes()
    //tambien se le declara un prefijo para identificar el contexto en esto caso user
    constructor() {

        this.router.use(this.prefix, this.middlewares());
        this.router.use(this.prefix, this.routes());

    }

    middlewares() {

        let middlewares = [
            (req: Request, res: Response, next: NextFunction) => {

                console.log('You are on User\'s ApiREST');
                next();

            }
        ];

        return middlewares;

    }

    routes(){
        
        //se instancia el controlador para poder ser usado en las rutas
        this.userController = new UserController();
    
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

    }    

}