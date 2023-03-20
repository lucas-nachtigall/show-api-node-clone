"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes_1.routes);
app.get('/', function (req, res) {
    res.send('Hello!');
});
if (!module.parent) {
    app.listen(port);
    console.log('Express started on port 3000');
}
exports.default = app;
