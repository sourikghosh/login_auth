"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./api/routes"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(routes_1.default);
var port = "4000";
if (process.env.PORT)
    port = process.env.PORT;
app.listen(port, function () { return console.log("The server is running at " + port); });
