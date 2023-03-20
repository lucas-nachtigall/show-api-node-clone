"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const SessionService_1 = require("./modules/session/SessionService");
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
app.get('/teste', (req, res) => {
    const service = new SessionService_1.SessionService();
    let allSessions = service.getAllSessions();
    // Output the book to the console for debugging
    allSessions.then(a => console.log(a));
    allSessions.then(a => res.send(a));
});
if (!module.parent) {
    app.listen(port);
    console.log('Express started on port 3000');
}
exports.default = app;
