const fs = require("fs");

class ServerConfig {
  constructor() {
    this.config = {};
  }

  loadConfig(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, "utf8", (error, data) => {
        if (error) {
          this.config = {};
          reject(error);
        } else {
          try {
            this.config = JSON.parse(data);
            resolve();
          } catch (error) {
            this.config = {};
            reject(error);
          }
        }
      });
    });
  }

  get isHttps() {
    return "isHttps" in this.config ? this.config.isHttps : false;
  }

  get serverPort() {
    return "serverPort" in this.config ? this.config.serverPort : 5000;
  }

  get mongoDBUserName() {
    return "mongoDBUserName" in this.config ? this.config.mongoDBUserName : "";
  }
  get mongoDBPassword() {
    return "mongoDBPassword" in this.config ? this.config.mongoDBPassword : "";
  }
  get mongoIP() {
    return "mongoIP" in this.config ? this.config.mongoIP : "";
  }
  get mongoDBName() {
    return "mongoDBName" in this.config ? this.config.mongoDBName : "";
  }
  get callCenter() {
    return "callCenter" in this.config ? this.config.callCenter : {};
  }

  get authUsers() {
     return "Users" in this.config ? this.config.Users : []
  }
}

module.exports = ServerConfig;


