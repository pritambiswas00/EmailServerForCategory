import { HandleEmailController } from "./HandleEmail.controller";
import { Utils } from "../Utils/utils";
export class HandleEmailModule {
     constructor(appModule, config, logger, connection, prefix) {
          this.appModule = appModule;
          this.prefix = prefix;
          this.config = config;
          this.logger = logger;
          this.utils = new Utils();
          this.connection = connection;
          this.handleEmailController = new HandleEmailController(config, connection, logger, this.utils);
          this.initializeApis();
     }


      initializeApis() {
         ////APi Fetch By CallCenter//// 
        this.appModule.post(this.prefix+"/handleEmail",(...args)=>this.#middleWare(...args),(...args)=>this.handleEmailController.handleEmailControl(...args));

        ////API gives list of Category////
       this.appModule.get(this.prefix+"/getAllCategory", (...args)=>this.#middleWare(...args), (...args)=>this.handleEmailController.getAllCategory(...args));

     }

     #middleWare(req, res, next) {
           try{
               const users  = this.config.authUsers;
               if(!req.headers.authorization || !req.headers.authorization.includes("Basic ")) {
                   return res.status(401).send({
                       status: false,
                       error: "Missing authorization header."
                   })
               }
               const token = req.headers.authorization.replace("Basic ", "");
               const credentials = Buffer.from(token, "base64").toString("ascii");
               const [username, password] = credentials.split(":");
               const userExists = users.find((user) => user.username === username & user.password === password);
                  if (!userExists) {
                    return res.status(401).json({ status: false, message: "UnAuthorized."});
                  }
               next();
           }catch(error) {
                res.status(500).send({
                    status : false,
                    error : error
                })
                this.logger.error(error);
                console.log(error);
           }
     }
}