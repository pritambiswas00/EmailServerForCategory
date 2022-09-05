import { HandleEmailServices } from "./HandleEmail.services";

export class HandleEmailController {
    constructor(config = Object, connection = Object, logger = Object, utils = Object) {
        this.config = config;
        this.utils = utils;
        this.handleEmailServices = new HandleEmailServices(config, connection, logger);
        this.logger = logger;
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
            await this.handleEmailServices.handleEmailServices(req.body);
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
           return this.handleEmailServices.getCategoryService(req, res);
          }catch(error) {
            res.status(500).json({
                status: false, error : error
            })
            this.logger.error(error);
            console.log(error);
          }
    }
    

}