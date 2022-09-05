const { IsNodeComplete } = require("./IsNodeCompleteHandler");
const { ValidateInputHandler } = require("./ValidateInputHandler");
const { ConversationFlow } = require("./ConversationFlow");
const { QuestionHandler } = require("./QuestionHandler");
class Handler {
    constructor(_info) {
        this.info = _info;
        this.conversation = new ConversationFlow();
        this.questionHandler = new QuestionHandler(this.conversation, this.info);
        this.isNodeCompleteHandler = new IsNodeComplete(this.conversation,this.info);
        this.validateInputHandler = new ValidateInputHandler(this.conversation,this.info);
    }
    async mainCategoryEmailHandler(incomingContext, incomingMessage) {
           try{
            const updatedContext = await this.validateInputHandler.mainHandler(incomingContext, incomingMessage);
            const categoryContext= await this.isNodeCompleteHandler.mainHandler(updatedContext);
            const instruction = this.questionHandler.mainHandler(categoryContext, incomingMessage);
            return instruction;
           }catch(error) {
            console.log(error)
              this.info.logger.error(error);
           }
    }

    initCategory(body) {
       const categoryContext = {
          corporate: body.corporate,
          categoryId: body.categoryId,
          ticketId: body.ticketId,
          email: body.from,
          subject: body.subject,
          text: body.body,
          problem: "",
          serialNumber: "",
          current_order : {},
          analyticsInfo: {},
          freshStart: true,
          currentNode: "A1"
       };
        const questionTree=this.conversation.getQuestionTree();
        const keys = Object.keys(questionTree);
       for( let key of keys) {
              categoryContext.current_order[key] = {
                status: false,
                answer: "",
                count: 0
              }
       }
       console.log(categoryContext)
    return categoryContext;
    }
}

module.exports = { Handler };