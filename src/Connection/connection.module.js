import { MongoClient } from "mongodb";
export class Connection {
     constructor(logger = Object, config = Object) {
         this.logger = logger;
         this.config = config;
     }

    async connectDatabase() {
        try{
            const self = this;
            const authString = "";
            if (this.config.mongoDBUserName != "") {
                authString = encodeURIComponent(this.config.mongoDBUserName) + ":" + encodeURIComponent(this.config.mongoDBPasswd) + "@"
            }
            const url = "mongodb://" + authString + this.config.mongoIP + ":27017/" + this.config.mongoDBName;
        
            //Connection Establishment
            self.client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            self.db = self.client.db(self.config.mongoDBName);
            this.logger.info("Connected to the Database."+this.config.mongoDBName);
            return true;
        }catch(error){
            this.logger.error("Error connecting to the Database."+error);
            throw new Error(error);
        }
    };
    
    async getCollection(collectionName="string") {
         try{
            const collection = await this.db.collection(collectionName,{ strict: true });
            return collection;
         }catch(error){
            throw new Error(error);
         }
    }
}