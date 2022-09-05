import { HandleEmailServices } from "./HandleEmail.services";
import { EventEmitter } from "events";

export class HandleEmailController {
    constructor(config = Object, connection = Object, logger = Object, utils = Object) {
        this.config = config;
        this.utils = utils;
        this.eventEmitter=new EventEmitter();
        this.eventNames={
             SEND_DATA_TO_CATEGORY:"SEND_DATA_TO_CATEGORY",
        }
        this.handleServices = new HandleEmailServices(config, connection, logger);
        this.logger = logger;
        this.#handleEmailProcessEvent();
    }

    async handleEmailControl(req, res) {
         try{
             const errors = await this.utils.handleEmailDTO(req);
            if (!errors.isEmpty()) {
                const [error] = errors.array();
                return res.status(400).json({
                      status:false,
                      message: error.msg
                })
            }
            res.status(200).json({
                status:true
            });
            this.eventEmitter.emit(this.eventNames.SEND_DATA_TO_CATEGORY, req.body)
            
         }catch(error) {
              res.status(500).json({
                  status: false, error : error
              })
              this.logger.error(error);
              console.log(error);
         }
         
    }

    getAllCategory (req, res) {
          try{
           return this.handleServices.getCategoryService(req, res);
          }catch(error) {
            res.status(500).json({
                status: false, error : error
            })
            this.logger.error(error);
            console.log(error);
          }
    }

    #handleEmailProcessEvent() {
          try{
             this.eventEmitter.on(this.eventNames.SEND_DATA_TO_CATEGORY, async (body=Object)=> {
                   await this.handleServices.handleEmailServices(body);
             })
          }catch(error) {
            this.logger.error(error);
            console.log(error);
          }
    }
    

}