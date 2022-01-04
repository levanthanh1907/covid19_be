"use strict";
const AuthService = require("../services/authService");
const baseRouter_1 = require("./baseRouter");
const fakeData = {
    result: {
        application: {
            version: "4.3.0.0",
            releaseDate: "2021-07-20T15:49:07.1350156+07:00",
            features: {},
        },
        user: null,
        tenant: null,
    },
    targetUrl: null,
    success: true,
    error: null,
    unAuthorizedRequest: false,
    __abp: true,
};
/**
 * @description AuthLoginRouter
 */
class AuthLoginRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super();
        this.authService = AuthService;
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.get("/Session/GetCurrentLoginInformations", (req, res, next) => {
            res.status(200).json(fakeData);
        });
        this.router.post("/Authenticate", this.authService.login);
    }
}
module.exports = new AuthLoginRouter().router;
//# sourceMappingURL=authLoginRouter.js.map