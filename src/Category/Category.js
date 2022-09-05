const { TestEmailCategory } = require("./TestEmailCategory/Category");
class Category {
      constructor(logger, config, connection) {
          this.info = {
               logger: logger,
               config: config,
               connection: connection
          }  
          this.categories = {
              "TestCategory": new TestEmailCategory(this.info)
          };
      }

      async initContext(body) {
        console.log("context")
         const contextDetails = this.categories[body.categoryId].initCategory(body);
         return contextDetails;
      }

      async handleEmail(categoryContext,body) {
           console.log("Handle Email");
            const context = this.categories[body.categoryId].mainEmailHandler(body, categoryContext);
            return context; 
      }
}


module.exports = { Category }