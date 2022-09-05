const conversationFlow = require("../ConversationFlow.json");

class ConversationFlow {
     constructor() {
         this.conversationFlow = conversationFlow;
     }

     getRootNode() {
          return this.conversationFlow["rootNode"];
     }
     getWelComeMessage() {
         return this.conversationFlow["WelcomeMessage"];
     }

     getConversationQuestion(node) {
         return this.conversationFlow["questionTree"][node];
     }

     getQuestionTree() {
         const questionTree = this.conversationFlow["questionTree"];
         return questionTree;
     }

}

module.exports = { ConversationFlow };