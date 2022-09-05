

class QuestionHandler {
    constructor(_conversation, info) {
        this.conversation = _conversation;
        this.info = info;
    } 

    mainHandler(categoryContext, body) {
        try{
           const question = this.conversation.getConversationQuestion(categoryContext.currentNode).question.question;
           categoryContext.current_order[categoryContext.currentNode].status = true;
           categoryContext.current_order[categoryContextcurrentNode].count++;
           const updatedCategoryContext = {...categoryContext}
           return {
                type: "REPLY",
                 data: {
                 corporate: updatedCategoryContext.corporate,
                 categoryId: updatedCategoryContext.categoryId,
                     categoryContext: updatedCategoryContext,
                     subject: body.subject,
                     body: question,
                     emailDateTime: new Date().getUTCDate(),
                     to: body.from,
                     closeTicket: false,
                     from: body.to
                 }
           }  

        }catch(error) {
            this.info.logger.error(error);
            console.log(error, "FROM QUESTION HANDLER.")
        }
    }
}

module.exports = { QuestionHandler };