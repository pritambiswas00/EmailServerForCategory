const { Handler } = require("./services/Handler");

class TestEmailCategory{
      constructor(info) {
          this.info =  info;
          this.handler = new Handler(this.info);
      }

    //   async initCategoryContext(body) {
    //       try {
    //          const context = {
    //              problem: "",
    //              serialNumber: "",
    //              serviceRequestId: "",
    //          }
    //          return context;
    //       } catch (error) {
    //          throw new Error(error);
    //       }
    //   }

    //   async handleEmail(recieve, categoryContext) {
    //         console.log(recieve, "RECIEVE")
    //         try{
    //             const {
    //             corporate,
    //             categoryId,
    //             from ,
    //             to ,
    //             body,
    //             subject,
    //             ticketId,
    //             emailDateTime } = recieve;
    //             const problem = this.identifyProblemFromBody(body);
    //             const serialNumber = this.identifySerialNumberFromBody(body);
    //             let finalProblem = problem || categoryContext.problem;
    //             let finalSerialNumber = serialNumber || categoryContext.serialNumber;

    //             if(finalProblem && finalSerialNumber) {
    //                 const categoryContext = {
    //                     problem: finalProblem,
    //                     serialNumber: finalSerialNumber,
    //                     serviceRequestId: new Date().getTime().toString(),
    //                 }
    //                 return {
    //                  type: "REPLY",
    //                  data: {
    //                     corporate: corporate,
    //                     categoryId: categoryId,
    //                      categoryContext: categoryContext,
    //                      subject: recieve.subject,
    //                      body: `Hi, \n We have noted your serial number as ${finalSerialNumber} and problem as ${finalProblem}.\n We have created a service request with ID ${categoryContext.serviceRequestId}.\n Thanking you. \n Regards, Service Team.`,
    //                      emailDateTime: new Date().getUTCDate(),
    //                      to: recieve.from,
    //                      closeTicket: true,
    //                      from: recieve.to
    //                   }
    //                 }  
    //             }else if (finalProblem && !finalSerialNumber) {
    //                 const categoryContext = {
    //                     problem: finalProblem,
    //                     serialNumber: finalSerialNumber,
    //                     serviceRequestId:"",
    //                 }
    //                 return {
    //                     type: "REPLY",
    //                     data: {
    //                         corporate: corporate,
    //                         categoryId: categoryId,
    //                         categoryContext: categoryContext,
    //                         subject: recieve.subject,
    //                         body: `Hi, \n We have noted your problem as ${finalProblem}.\n Kindly provide the serial number of the device.\n Thanking you. \n Regards, Service Team.`,
    //                         emailDateTime: new Date().getUTCDate(),
    //                         to: recieve.from,
    //                         closeTicket: false,
    //                         from: recieve.to
    //                     }
    //                    } 


    //             }else if (!finalProblem && finalSerialNumber) {
    //                 const categoryContext = {
    //                     problem: finalProblem,
    //                     serialNumber: finalSerialNumber,
    //                     serviceRequestId:"",
    //                 }
    //                 return {
    //                     type: "REPLY",
    //                     data: {
    //                         corporate: corporate,
    //                         categoryId: categoryId,
    //                         categoryContext: categoryContext,
    //                         subject: recieve.subject,
    //                         body: `Hi, \n We have noted your serial number as ${finalSerialNumber}. \n Kindly provide the problem that you are facing.\n Thanking you. \n Regards, Service Team.`,
    //                         emailDateTime: new Date().getUTCDate(),
    //                         to: recieve.from,
    //                         closeTicket: false,
    //                         from: recieve.to
                         
    //                     }
    //                    }
    //             }else{
    //                 const categoryContext = {
    //                     problem: finalProblem,
    //                     serialNumber: finalSerialNumber,
    //                     serviceRequestId: "",
    //                 }
    //                    return {
    //                     type: "REPLY",
    //                     data: {
    //                         corporate: corporate,
    //                         categoryId: categoryId,
    //                         categoryContext: categoryContext,
    //                         subject: recieve.subject,
    //                         body: `Hi, \n We have recieved your email. Please provide serial number of the device and problem you are facing. \n Thanking you. \n Regards, Service Team.`,
    //                         emailDateTime: new Date().getUTCDate(),
    //                         to: recieve.from,
    //                         closeTicket: false,
    //                         from: recieve.to
    //                      }
    //                 }   
    //             }
    //             // const ins = {
    //             //      type: "REPLY",
    //             //      data: {
    //             //          categoryContext: {...categoryContext, text: "HEY HOW CAN I HELP YOU?" },
    //             //          subject: recieve.subject,
    //             //          body: "HEY HOW CAN I HELP YOU?",
    //             //          emailDateTime: new Date().getUTCDate(),
    //             //          to: recieve.from,
    //             //          closeTicket: false
    //             //      }
    //             // }
    //             // return ins;   
                 
    //         }catch(error) {
    //               throw new Error(error);
    //         }
    //   }

    //   identifyProblemFromBody(body){
    //         let match = body.match(/(Printing|Connectivity) Problem/i);
    //         if(match) {
    //             return match[0];
    //         }else{
    //             return ""
    //         }   
    //   }

    //   identifySerialNumberFromBody (body) {
    //      let match = body.match(/[a-z]{3}[0-9]{5}/i);
    //      if(match) {
    //          return match[0];
    //      }
    //      return ""
    //   }

      async mainEmailHandler(body, categoryContext) {
          const query = this.handler.mainCategoryEmailHandler(categoryContext, body);
          return query;
      }

      async initCategory(body) {
          return this.handler.initCategory(body);
      }

}

module.exports = { TestEmailCategory }