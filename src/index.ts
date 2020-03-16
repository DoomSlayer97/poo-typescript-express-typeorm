import 'reflect-metadata'
import { createConnection, createConnections }  from 'typeorm'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { UserRouter } from './routes/user.router'
import { TaskController } from './controllers/task.controller'
import { TaskRouter } from './routes/task.router'
import * as cors from 'cors'
import * as morgan from 'morgan'
import { CountryRouter } from './routes/country.router'
import { StateRouter } from './routes/state.router'

class App {

    private app: express.Application;

    constructor() {

        this.app = express();
        this.configApp();
        this.configMiddlewares();
        this.createRoutes();
        this.runApp();

    }


    //configuracion de los middlewares
    configMiddlewares() {

        

    }

    //configuraciones principales para la aplicacion
    configApp() {

        this.app.set('port', 3000);
        

        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.urlencoded({ extended: true}));
        this.app.use(bodyParser.json());

        

    }

    //apertura de rutas de la aplicacion
    createRoutes() {

        this.app.use('/api', new UserRouter().routes());
        this.app.use('/api', new TaskRouter().routes());
        this.app.use('/api', new CountryRouter().routes());
        this.app.use('/api', new StateRouter().routes());

    }

    //funciona para levantar el servidor
    runApp() {

        this.app.listen(this.app.get('port'), () => { 
            console.log(`Servidor levantado en el puerto ${this.app.get('port')}`) 
        });

    }

}

createConnection().then( async res => {
    
    new App();

});