const conversationFlow = require("../ConversationFlow.json");
const _ =require("lodash");

class ConversationFlow {
     constructor() {
         this.conversationFlow = conversationFlow;
        //  console.log(this.conversationFlow["questionTree"]["A1"])
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
        return this.conversationFlow["questionTree"];  
     }

     getNextNode(node) {
         console.log("get next node")
          let nodeDetails=this.getQuestionTree();
          if(_.isEmpty(nodeDetails)) return null;
          return nodeDetails[node].questions.answers.nextNode;
     }

}

module.exports = { ConversationFlow };