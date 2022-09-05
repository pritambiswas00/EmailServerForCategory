

class ValidateInputHandler {
     constructor(_conversation, _info) {
        this.conversation = _conversation;
        this.info = _info;
     }

     mainHandler(categoryContext, body) {
        try{
            
        }catch(error) {
            this.info.logger.error(error);
            console.log(error, "FROM Validate Input Handler")
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