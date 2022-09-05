import {
    Category
} from "../Category/Category";
import {
    Utils
} from "../Utils/utils";
import fetch from "node-fetch";
export class HandleEmailServices {
    constructor(config = Object, connection = Object, logger = Object) {
        this.config = config;
        this.connection = connection;
        this.logger = logger;
        this.utils = new Utils();
        this.ticketCollectionName = "EmailTicketCollection";
        this.emailTicketConversation = "EmailConversationCollection"
        this.category = new Category(logger, config, connection);
        this.Users = {
            USER: "USER",
            BOT: "BOT"
        }
        this.process = {
            REPLY: "REPLY",
            L1_AGENT: "L1_AGENT"
        }
    }

    async handleEmailServices(body) {
        try {
            console.log(body, "EMAIL SERVICE PROCESS STARTED");
            const ticketCollection = await this.connection.getCollection(this.ticketCollectionName);
            const ticketQuery = {
                ticketId: body.ticketId,
                corporate: body.corporate,
                to: body.to.toString().toLowerCase(),
                from: body.from.toString().toLowerCase()
            }
            const isTicketExist = await ticketCollection.findOne(ticketQuery);
            const context = await this.category.initContext(body)
            console.log(context, "CONTEXT");
            if (!isTicketExist) {
                await this.#createTicket(body, context, ticketCollection);
                await this.#createConversation(body);
            }
            await this.#updateConversation(this.Users.USER, body, undefined);
            const existedTicket = await ticketCollection.findOne(ticketQuery);
            const instruction = await this.category.handleEmail(existedTicket.categoryContext, body);
            console.log(instruction, "INSTRUCTION");
            // this.#typeChecking(instruction, body);
            // await this.#updateConversation(this.Users.BOT, body, instruction);
            // console.log("EMAIL SERVICE PROCESS FINISHED");
        } catch (error) {
            this.logger.error(error);
            console.log(error);
            throw new Error(error);
        }
    }

    getCategoryService(req, res) {
        try {
            const totalList = Object.keys(this.category.categories);
            if (totalList.length === 0) {
                return res.status(400).send({
                    status: false,
                    message: "No category found",
                    data: []
                })
            }
            return res.status(200).send({
                status: true,
                data: totalList
            })
        } catch (error) {
            console.log(error);
            this.logger.error(error)
            throw new Error(error);
        }
    }

    async #createTicket(body = Object, context = Object, ticketCollection) {
        try {
            await ticketCollection.insertOne({
                corporate: body.corporate,
                ticketId: body.ticketId,
                status: "NEW",
                to: body.to.toString().toLowerCase(),
                from: body.from.toString().toLowerCase(),
                categoryContext: context,
                categoryId: body.categoryId,
                createdAt: this.utils.giveUtcCurrentTime(),
                updatedAt: this.utils.giveUtcCurrentTime()
            });
        } catch (error) {
            console.log(error);
            this.logger.error(error)
            throw new Error(error);
        }
    }

    async #createConversation(body = Object) {
        try {
            const conversationCollection = await this.connection.getCollection(this.emailTicketConversation);
            const response = await conversationCollection.insertOne({
                corporate: body.corporate,
                ticketId: body.ticketId,
                to: body.to.toString().toLowerCase(),
                from: body.from.toString().toLowerCase(),
                conversationArray: [],
                createdAt: this.utils.giveUtcCurrentTime(),
                updatedAt: this.utils.giveUtcCurrentTime()
            })
        } catch (error) {
            console.log(error);
            this.logger.error(error)
            throw new Error(error);
        }
    }

    async #updateConversation(type = "string", body = Object, instruction = Object || undefined) {
        try {
            switch (type) {
                case this.Users.USER:
                    const conversationCollectionForUser = await this.connection.getCollection(this.emailTicketConversation);
                    await conversationCollectionForUser.updateOne({
                        ticketId: body.ticketId,
                        corporate: body.corporate,
                        to: body.to,
                        from: body.from,
                    }, {
                        $push: {
                            conversationArray: {
                                from: body.from.toString().toLowerCase(),
                                to: body.to.toString().toLowerCase(),
                                subject: body.subject,
                                body: body.body,
                                date: body.emailDateTime,
                                source: type
                            }
                        }
                    });
                    break;
                case this.Users.BOT:
                    const conversationCollectionForBot = await this.connection.getCollection(this.emailTicketConversation);
                    await conversationCollectionForBot.updateOne({
                        ticketId: body.ticketId,
                        corporate: body.corporate,
                        to: body.to,
                        from: body.from,
                    }, {
                        $push: {
                            conversationArray: {
                                from: body.to,
                                to: body.from,
                                subject: instruction.data.subject,
                                body: instruction.data.body,
                                date: instruction.data.emailDateTime,
                                source: type
                            }
                        }
                    });
                    break;
                default:
                    break;
            }
        } catch (error) {
            this.logger.error(error);
            console.log(error);
            throw new Error(error);
        }
    }

    async #updateTicketCollection(body = Object, instruction = Object) {
        try {
            const ticketCollection = await this.connection.getCollection(this.ticketCollectionName);
            await ticketCollection.updateOne({
                ticketId: body.ticketId,
                corporate: body.corporate,
                to: body.to.toLowerCase(),
                from: body.from.toLowerCase()
            }, {
                $set: {
                    categoryContext: instruction.data.categoryContext,
                    status: instruction.data.closeTicket ? "CLOSED" : "IN_PROGRESS"
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async #sendMessageDataToCallCenter(data = Object) {
        try {
            const newData = {...data, body: data.body.toString()}
            console.log(newData, "NEW DATAT")
            console.log(JSON.stringify(newData));
            const newBody = JSON.stringify(newData);
            const {
                baseURL,
                username,
                password
            } = this.config.callCenter;
            const sendOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
                },
                body: newBody
            }
            const response = await fetch(baseURL + "/EmailChannel/EmailChannelMessageResponse", sendOptions);
            const responseData = await response.json();
            if (!responseData.status) {
                console.error(responseData, "SENDING TO THE CALLCENTER FAILED");
                this.logger.error("Failed to send data to the callcenter", responseData);
            }
            this.logger.info("Successfuly sent data to the call center.")
            return;
        } catch (error) {
            console.log(error);
            this.logger.error(error);
            throw new Error(error);
        }
    }

    async #typeChecking(instruction = Object, body = Object) {
        try {
            switch (instruction.type) {
                case this.process.REPLY:
                    await this.#updateTicketCollection(body, instruction);
                    if (this.config.callCenter) {
                        // await this.#sendMessageDataToCallCenter(instruction.data);
                        console.log(body, instruction, "SENDING MESSAGE TO THE CALL CENTER.")
                    }
                    break;
                case this.process.L1_AGENT:
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            this.logger.error(error);
            throw new Error(error);
        }
    }
}