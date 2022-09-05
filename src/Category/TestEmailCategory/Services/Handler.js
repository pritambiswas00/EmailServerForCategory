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
    async mainCategoryEmailHandler(categoryContext, body) {
           try{
             const query = this.isNodeCompleteHandler.mainHandler(categoryContext,body);
             console.log(query, "Query")
            //  if(!query[0]) {
            //      const validatingInput = this.validateInputHandler.mainHandler(query[1], body);
            //      return this.questionHandler.mainHandler(validatingInput[0], body);
            //  }
            //  return this.questionHandler.mainHandler(query[1], body);
           }catch(error) {
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
        console.log(this.conversation.getQuestionTree(), "Conversation Flow")
       for( let key in Object(this.conversation.getQuestionTree())) {
              categoryContext.current_order[key] = {
                status: false,
                answer: "",
                count: 0
              }
       }
    return categoryContext;
    }
}

module.exports = { Handler };