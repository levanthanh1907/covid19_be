import authLoginRouter from "./authLoginRouter";
import { BaseRouter } from "./baseRouter";
import bodyParser = require("body-parser");
import userRouter = require("./userRouter");
import roleRouter = require("./roleRouter");
import taskRouter = require("./taskRouter");
import projectRouter = require("./projectRouter");

class MasterRouter extends BaseRouter {
  constructor() {
    super();
    this.configure();
    this.init();
  }

  private configure() {
    this.router.use(bodyParser.json()); // to support JSON-encoded bodies
    this.router.use(
      bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
      })
    );
  }

  /**
   * Connect routes to their matching routers.
   */
  protected init() {
    this.router.use("/services/app", authLoginRouter);
    this.router.use("/TokenAuth", authLoginRouter);
    this.router.use("/User", userRouter);
    this.router.use('/Role', roleRouter);
    this.router.use('/Task', taskRouter);
    this.router.use('/Project', projectRouter);
  }
}

export = new MasterRouter().router;
