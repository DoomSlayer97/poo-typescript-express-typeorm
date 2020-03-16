import { Router, Request, Response, RequestParamHandler, RequestHandler, NextFunction } from "express";
import { StateController } from '../controllers/state.controller'

export class StateRouter {

    private router = Router();
    private prefix = '/state';
    private stateController: StateController;

    constructor() {

        this.router.use(this.prefix, this.routes());

    }

    routes() {


        this.stateController = new StateController();

        this.router.get('/findall/by/country/:idCountry', this.stateController.findByCountry);
        this.router.get('/find/:id', this.stateController.findOne);
        this.router.post('/', this.stateController.createOne);
        this.router.delete('/', this.stateController.deleteOne);

        return this.router;

    }

}