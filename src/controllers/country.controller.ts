import { Router, Request, Response } from "express";
import { getRepository, getConnectionManager, Repository, useContainer } from 'typeorm'
import * as Validator from 'validatorjs'
import { Country } from "../models/Country";
import { paginate } from "../helpers/Paginator";

export class CountryController {

    async findAll(req: Request, res:Response) {

        let findedCountrys = await getRepository(Country).find();

        let pagination = paginate(findedCountrys, req.query.page, req.query.items);

        return res.status(200).json({
            countries: pagination.data,
            pagination
        });

    }

    async findOne(req: Request, res: Response) {

        let findedCountry = await getRepository(Country).findOne(req.params.id);
        
        if(!findedCountry) return res.status(404).json({
            message: 'country no encontrado'
        });

        return res.status(200).json({
            country: findedCountry
        });

    }

    async deleteOne(req: Request, res: Response) {

        let countryRepository = getRepository(Country);

        let findedCountry = await countryRepository.findOne(req.body.id);
        findedCountry.regStatus = 0;

        let deletedCountry = await countryRepository.save(findedCountry);

        if(!deletedCountry) return res.status(401).json({
            message: 'counrty no pudo ser eliminado'
        });      

        return res.status(201).json({
            message: 'country eliminado',
            country: deletedCountry
        });

    }

    async createOne(req: Request, res: Response) {

        let reqParams = req.body;

        let validator = new Validator(reqParams, {
            name: 'required'
        });

        if(validator.fails()) return res.status(500).json({
            message: 'error de campos',
            errors: validator.errors.errors
        });

        let newCountry = new Country();
        newCountry.name = req.body.name;

        let createdCountry = await getRepository(Country).save(newCountry);

        if(!createdCountry) return res.status(401).json({
            message: 'error al crear'
        });

        return res.status(201).json({
            message: 'country creado',
            country: createdCountry
        })

    }

}