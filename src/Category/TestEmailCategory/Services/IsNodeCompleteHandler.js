const _ = require('lodash');

class IsNodeComplete {
     constructor(_conversation, _info) {
         this.conversation = _conversation;
         this.info = _info;
     }

    async mainHandler(categoryContext) {
          try{
                switch(categoryContext.currentNode){
                     case "A1": 
                         const A1Node  = await this.#checkNodeA1(categoryContext);
                         return A1Node;
                     default: 
                         return;   
                }
          }catch(error) {
               console.log(error)
               this.info.logger.error(error);
          }
     }


     async #checkNodeA1(categoryContext=Object) {
           try{
              let categoryContextNew={...categoryContext};
              if(categoryContextNew.current_order.A1.answer !== "") {
               categoryContextNew.current_order["A1"].status=true;
               categoryContextNew.current_order["A1"].count++;
               categoryContextNew.currentNode=this.conversation.getNextNode("A1");
                    return categoryContextNew;
              }else{
                    return categoryContextNew;
              }
           }catch(error) {
               console.log(error)
                this.info.logger.error(error);
           }
     }

     setCurrentOrder (categoryContext, node) {
            
     }
}

module.exports = {IsNodeComplete};

