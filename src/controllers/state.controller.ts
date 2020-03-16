import { Router, Request, Response } from "express";
import { getRepository, getConnectionManager, Repository, useContainer, DeleteDateColumn } from 'typeorm'
import * as Validator from 'validatorjs'
import { Country } from "../models/Country";
import { State } from "../models/State";
import { paginate } from "../helpers/Paginator";

export class StateController {

    async findByCountry(req: Request, res: Response) {

        let findedCountry = await getRepository(Country).findOne(req.params.idCountry);
        
        if(!findedCountry) return res.status(404).json({
            message: 'Country no encontrado'
        })

        let findedStates = await getRepository(State).find({
            where: {country: findedCountry}
        });

        let pagination = paginate(findedStates, req.query.page, req.query.items);

        return res.status(201).json({
            country: findedCountry,
            states: pagination.data,
            pagination
        });


    }

    async findOne(req: Request, res: Response) {

        let findedState = await getRepository(State).findOne(req.params.id);

        if(!findedState) return res.status(404).json({
            message: 'no se encontro el state'
        });

        return res.status(200).json({
            state: findedState
        });

    }

    async deleteOne(req: Request, res: Response) {

        let stateRepository = getRepository(State);

        let findedState = await stateRepository.findOne(req.body.id);
        findedState.regStatus = 0;

        let deletedSate = await stateRepository.save(findedState);

        if(!deletedSate) return res.status(401).json({
            message: 'state no puedo ser eliminado'
        }); 

        return res.status(200).json({
            message: 'state eliminado',
            state: deletedSate
        });

    }

    async createOne(req: Request, res: Response) {

        let reqParams = req.body;

        let validator = new Validator(reqParams, {
            name: 'required|string',
            countryId: 'required'
        });

        if(validator.fails()) return res.status(500).json({
            message: 'errores de campos',
            errors: validator.errors.errors
        });

        let findedCountry = await getRepository(Country).findOne(req.body.countryId);

        let newState = new State();
        newState.name = req.body.name;
        newState.country = findedCountry;

        let createdState = await getRepository(State).save(newState);

        if(!createdState) return res.status(401).json({
            message: 'error al guardar'
        });

        return res.status(200).json({
            message: 'state guardado',
            state: createdState
        });

    }

}