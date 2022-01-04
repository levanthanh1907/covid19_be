"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const server_1 = require("./server");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const logging_1 = __importDefault(require("./config/logging"));
const cors = require("cors");
const NAMESPACE = "Server";
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.default.mongo.url, config_1.default.mongo.options)
    .then((result) => {
    logging_1.default.info(NAMESPACE, "connected to MongoDB!");
})
    .catch((error) => {
    logging_1.default.error(NAMESPACE, error.message, error);
});
/**
 * Application class.
 * @description Handle init config and components.
 */
dotenv_1.default.config({
    path: ".env",
});
class Application {
    init() {
        this.initServer();
    }
    initServer() {
        this.server = new server_1.Server();
    }
    start() {
        ((port = process.env.APP_PORT || 5000) => {
            this.server.app.use(cors());
            this.server.app.listen(port, () => console.log(`> Listening on port ${port}`));
            this.server.app.use("/api", this.server.router);
        })();
    }
}
exports.Application = Application;
//# sourceMappingURL=app.js.map