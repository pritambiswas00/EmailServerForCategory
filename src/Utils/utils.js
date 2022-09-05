import { body, param, query, validationResult } from "express-validator"

export class Utils {
       constructor() {}
    giveUtcCurrentTime() {
          const date = new Date();
          const M = date.getUTCMonth();
          const D = date.getUTCDate();
          const Y = date.getUTCFullYear();
          const H = date.getUTCHours();
          const MIN = date.getUTCMinutes();
          const S = date.getUTCSeconds();
          return `${D}/${M}/${Y}T${H}:${MIN}:${S}`;

    }
    
    async handleEmailDTO(req) {
      await body("corporate", "Please provide a valid corporate name.").notEmpty().isString().run(req);
      await body("categoryId", "Please provide a valid category Id").notEmpty().isString().run(req);
      await body("from", "Please provide a valid from email address").notEmpty().isEmail().run(req);
      await body("to", "Please provide a valid to email address").notEmpty().isEmail().run(req);  
      await body("subject", "Please provide a valid subject").notEmpty().isString().run(req);
      await body("body", "Please provide a valid body").notEmpty().isString().run(req);
      await body("ticketId", "Please provide a valid ticket Id").notEmpty().isString().run(req);
      await body("emailDateTime").notEmpty().isString().run(req)
      return validationResult(req);
    }

}