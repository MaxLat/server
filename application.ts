import { Application } from "express";
import express = require("express");
import { CronService } from "./src/services/cron/cronService";
import { connect} from "./src/services/database/database"
const path = require("path");

var cors = require('cors');

export class App {
    public app: Application;

    
    constructor(
        private port: number,
        routes: Array<express.Router>,
    ) {
        this.app = express();
        this.middleware();
        this.assets();
        this.routes(routes);
    }


    private middleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(cors());
    }

    private routes(routes: Array<express.Router>) {

        
        routes.forEach((r) => {
            this.app.use(`/api`, r);
        });

        this.app.get('*', (req ,res) => {
            res.sendFile(
                path.join(__dirname, "../client/build/index.html")
              );
         });
    }

    public cron() {
        new CronService();
    }

    public async connectDatabase() {
        await connect()
    }

    private assets() {
        this.app.use(express.static(path.join(__dirname,"../client/build")));
    }

    /**
     * Start the Express app
     */
    public listen() {
        this.app.listen(this.port, () => {
            console.log("APP LISTENING ON PORT:", this.port);
        });
    }
}