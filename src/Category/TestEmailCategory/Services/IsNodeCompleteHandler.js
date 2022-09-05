const _ = require('lodash');

class IsNodeComplete {
     constructor(_conversation, _info) {
         this.conversation = _conversation;
         this.info = _info;
     }

     mainHandler(categoryContext, body) {
          try{
                switch(categoryContext.currentNode){
                     case "A1": 
                         console.log(categoryContext, body, "in isNode Complete MainHandler");
                         // return this.#checkNode(categoryContext, "A1");
                     default: 
                         return;    
                }
          }catch(error) {
               console.log(error, "In Is Node Complete");
               this.info.logger.error(error);
          }
     }


     #checkNode(categoryContext, node) {
           try{
               console.log(categoryContext, node, "is the node complete.")
          //      const nodeDetails = categoryContext.current_order[this.conversation.getConversationQuestion[node]]
          //      let updateContext = {};
          //     if(nodeDetails) {
          //          if(!nodeDetails.status && nodeDetails.answer === "" ) {
          //              return [false, categoryContext];
          //          }else {
          //           categoryContext.current_order[this.conversation.getConversationQuestion[node]].status = true;
          //           categoryContext.current_order[this.conversation.getConversationQuestion[node]].count++;
          //           return [true, categoryContext];
          //          }
          //     }
           }catch(error) {
                this.info.logger.error(error);
           }
     }

     setCurrentOrder (categoryContext, node) {
            
     }
}

module.exports = {IsNodeComplete};

