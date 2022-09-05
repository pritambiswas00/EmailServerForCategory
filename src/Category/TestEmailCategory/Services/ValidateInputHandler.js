

class ValidateInputHandler {
     constructor(_conversation, _info) {
        this.conversation = _conversation;
        this.info = _info;
     }

     async mainHandler(categoryContext, body) {
        try{
            const extractedInput = await this.#extractInput(categoryContext, body);
            switch(categoryContext.currentNode){
                   case "A1":
                        const A1Node = await this.#A1Node(extractedInput, body);
                        return A1Node;
                   default:
                        return;     
            }
        }catch(error) {
            this.info.logger.error(error);
            console.log(error, "FROM Validate Input Handler")
        }
     }

     async #extractInput(categoryContext, body) {
            try{
                let CategoryContext={...categoryContext};
                return CategoryContext;
            }catch(error) {
                this.info.logger.error(error);
                console.log(error)
            }
             
     }

     async #A1Node(categoryContext, body) {
          try{
             let current_order=categoryContext.current_order;
             const isProblemExist=this.#identifyProblemFromBody(body.body);
             if(isProblemExist!==""){
                  categoryContext.problem=isProblemExist;
                  current_order["A1"].answer=isProblemExist;
                  categoryContext.current_order=current_order;
                  return categoryContext;
             }
             return categoryContext;
          }catch(error) {
              
          }
     }

     #identifySerialNumberFromBody (text) {
         let match = text.match(/[a-z]{3}[0-9]{5}/i);
         if(match) {
             return match[0];
         }
         return ""
      }

     #identifyProblemFromBody(text){
            let match = text.match(/(Printing|Connectivity) Problem/i);
            if(match) {
                return match[0];
            }else{
                return ""
            }   
      }
}

module.exports = {ValidateInputHandler};