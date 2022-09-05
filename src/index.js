console.clear();
console.log(`/////////////`)
import express from 'express';
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import cors from 'cors';
import morgan from 'morgan';
import Logger from "./logger";
import ServerConfig from "./serverConfig";
import Log from "./log";
import { HandleEmailModule } from "./HandleEmail/HandleEmail.module";
import { Connection } from "./Connection/connection.module";
const app = express();




async function bootstrap(appModule) {
    let server;
    const serverConfig = new ServerConfig();
    await serverConfig.loadConfig(path.join(__dirname, "config.txt"));
    const port = serverConfig.serverPort;
    const log = new Log(Logger, serverConfig, appModule);
    log.init();
    appModule.use(express.json({ limit: "50mb" }));
    appModule.use(cors());
    appModule.use(
        morgan(":method :url :status :res[content-length] - :response-time ms"));
    appModule.use(express.urlencoded({
        extended: false
    }));
    appModule.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });
    appModule.set("config", serverConfig);
    appModule.set("logger", Logger);
    const connection = new Connection(Logger, serverConfig);
    await connection.connectDatabase();
    let instances = {
           emailChannel : new HandleEmailModule(appModule, serverConfig, Logger, connection, "")
    }
    if (serverConfig.isHttps) {
        const options = {
            key: fs.readFileSync("security/privatekey.pem"),
            cert: fs.readFileSync("security/certificate.pem"),
        };
        server = https.createServer(options, app);
    } else {
        server = http.createServer(app);
    }
    server.listen(port, () => {
        Logger.info(`Server is up at Port ${port}`);
        console.log(`Server is up at Port ${port}`);
    });
}

bootstrap(app);