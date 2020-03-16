import { Router, Request, Response, RequestParamHandler, RequestHandler, NextFunction } from "express";
import { CountryController } from '../controllers/country.controller'

export class CountryRouter {

    private router = Router();
    private prefix = '/country';
    private countryController: CountryController;

    constructor() {

        this.router.use(this.prefix, this.routes());

    }

    middlewares() {

        let middlewares = [
            
        ];

        return middlewares;

    }

    routes() {

        this.countryController = new CountryController();

        this.router.get('/findall', this.countryController.findAll);
        this.router.get('/find/:id', this.countryController.findOne);
        this.router.post('/', this.countryController.createOne);
        this.router.delete('/', this.countryController.deleteOne);

        return this.router;

    }

}
