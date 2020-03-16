import { Router, Request, Response } from "express";
import { getRepository, getConnectionManager, Repository, useContainer } from 'typeorm'
import { User } from "../models/User";
import * as Validator from 'validatorjs'
import { paginate } from "../helpers/Paginator";
import { State } from "../models/State";


export class UserController {

    //FUNCIONES CRUD
    async findAll(req: Request, res: Response) {

        let findedUsers = await getRepository(User).find({ 
            where: { regStatus: 1 },
            join: {
                alias: 'user',
                leftJoinAndSelect: {
                    "state": "user.state",
                    "country": "state.country"
                }
            }
        });

        let pagination = paginate(findedUsers, req.query.page, req.query.items);
        
        return res.status(200).json({
            users: pagination.data,
            pagination
        });

    }

    async findOne(req: Request, res: Response) {
       
        let findedUser = await getRepository(User).findOne(req.params.id, {
            join: {
                alias: 'user',
                leftJoinAndSelect: {
                    "state": "user.state",
                    "country": "state.country"
                }
            }
        });

        if(!findedUser) return res.status(404).json({
            message: 'No se encontro el registro'
        });

        return res.status(200).json({
            user: findedUser,
        });

    }

    async updateOne(req: Request, res: Response) {

        let reqParams = req.body;
        reqParams.id = req.params.id;

        let validator = new Validator(reqParams, {
            firstName: 'required|string',
            lastName: 'required|string',
            age: 'required|integer',
            email: 'required|email',
            id: 'required|integer'
        });

        if(validator.fails()) return res.status(500).json({
            message: 'errores de campos',
            errors: validator.errors.errors
        });

        let userRepository = getRepository(User);

        let findedUser = await userRepository.findOne(req.params.id);

        findedUser.firstName = req.body.firstName;
        findedUser.lastName = req.body.lastName;
        findedUser.age = req.body.age;
        findedUser.email = req.body.email;

        let updatedUser = await userRepository.save(findedUser);

        if(!updatedUser) return res.status(500).json({
            message: 'No se guardo correctamente'
        });

        return res.status(200).json({
            message: 'Se guardo de manera correcta',
            user: updatedUser
        });

    }    

    async createOne(req: Request, res: Response) {

        let reqParams = req.body;

        let validator = new Validator(reqParams, {
            firstName: 'required|string',
            lastName: 'required|string',
            age: 'required|integer',
            email: 'required|email',
            stateId: 'required|integer'
        }, {

        });

        if(validator.fails()) return res.status(500).json({
            message: 'errores de campos',
            errors: validator.errors.errors
        });

        let findedState = await getRepository(State).findOne(req.body.stateId);

        let newUser = new User();

        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.age = req.body.age;
        newUser.email = req.body.email;
        newUser.state = findedState;

        let createdUser = await getRepository(User).save(newUser);
        
        if(!createdUser) return res.status(400).json({
            message: 'error al guardar'
        });

        return res.status(200).json({
            message: 'guardar',
            user: createdUser
        });

    }

    async deleteOne(req: Request, res: Response) {

        try{

            let userRepository = getRepository(User);

            let findedUser = await userRepository.findOne(req.params.id);
    
            findedUser.regStatus = 0;
    
            let updatedUser = await userRepository.save(findedUser);
    
            if(!updatedUser) return res.status(500).json({
                message: 'No se elimino correctamente'
            });
    
            return res.status(200).json({
                message: 'Se elimino de manera correcta',
                user: updatedUser
            });


        } catch(e) {
            
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor'
            })

        }

        
    }

}