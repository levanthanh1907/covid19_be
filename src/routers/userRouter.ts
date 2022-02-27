import { authen } from "../middleware/Authen";
import { authorize } from "../middleware/Authorize";
import userService from "../services/userService";
import { BaseRouter } from "./baseRouter";

/**
 * @description UserRouter
 */
class UserRouter extends BaseRouter {
  private userService = userService;

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.post("/CreateUser", this.userService.createUser);
    this.router.put("/UpdateUser", this.userService.updateUser);
    this.router.delete("/DeleteUser", this.userService.deleteUser);
    this.router.get("/GetAllPagging", this.userService.getAllPagging);
    this.router.get("/GetAll", this.userService.getAll);
    // this.router.post('/UpdateAvatar', uploadOne, this.userService.updateAvatar);
    this.router.post("/ResetPassword", this.userService.resetPassword);
    this.router.get("/GetUserNotPagging", this.userService.getUserNotPagging);
  }
}

export = new UserRouter().router;
