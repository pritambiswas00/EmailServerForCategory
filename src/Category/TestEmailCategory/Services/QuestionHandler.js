class QuestionHandler {
    constructor(_conversation, info) {
        this.conversation = _conversation;
        this.info = info;
    } 

    mainHandler(categoryContext, incomingMessage) {
        console.log("questionhanflerhfbhdbcjhdbsjdbcjsbdcsdbc")
        try{
            let Context={...categoryContext}
            switch(Context.currentNode){
                 case "A1":
                      return this.#generateA1(categoryContext, incomingMessage);
                 default:
                      return;     
            }
        //    const question = this.conversation.getConversationQuestion(categoryContext.currentNode).question.question;
        //    categoryContext.current_order[categoryContext.currentNode].status = true;
        //    categoryContext.current_order[categoryContextcurrentNode].count++;
        //    const updatedCategoryContext = {...categoryContext}
        //    return {
        //         type: "REPLY",
        //          data: {
        //          corporate: updatedCategoryContext.corporate,
        //          categoryId: updatedCategoryContext.categoryId,
        //              categoryContext: updatedCategoryContext,
        //              subject: body.subject,
        //              body: question,
        //              emailDateTime: new Date().getUTCDate(),
        //              to: body.from,
        //              closeTicket: false,
        //              from: body.to
        //          }
        //    }  

        }catch(error) {
            this.info.logger.error(error);
            console.log(error, "FROM QUESTION HANDLER.")
        }
    }



     #generateA1(categoryContext, incomingMessage) {
        console.log("Genrrate A1 Question")
          const categoryContextNew={...categoryContext}
          try{
              let question=this.conversation.getConversationQuestion("A1");
              question = question.questions.question;
              const responseMessage={};
              responseMessage["type"]="REPLY";
              responseMessage["data"] = {
                           corporate: categoryContextNew.corporate,
                           categoryId: categoryContextNew.categoryId,
                           categoryContext: categoryContextNew,
                           subject: categoryContextNew.subject,
                           body: question,
                           emailDateTime: new Date(),
                           to: incomingMessage.from,
                           closeTicket: false,
                           from: incomingMessage.to
              }
              console.log("Generate A1 Question", responseMessage)
              return responseMessage;
          }catch(error) {
               console.log(error, "FROM QUESTION HANDLER.")
               this.info.logger.error(error);
          }
    }
}

module.exports = { QuestionHandler };