import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

import './config/conexao';
import { next } from 'sucrase/dist/parser/tokenizer';

class App{

    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(
            '/files',
            express.static(path.resolve(__dirname,"..", "tmp", "uploads"))
        );
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Methods",'GET, PUT, POST, DELETE');

            this.app.use(cors());
            next();
        });
    }
    routes(){
        this.app.use(routes);
    }
}

export default new App().app;
