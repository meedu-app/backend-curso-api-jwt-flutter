"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
require('dotenv').config();
process.env.TZ = 'America/Guayaquil'; // zona horaria de la app
var app = express_1.default();
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.set('view engine', 'ejs');
// public files
app.use(express_1.default.static('public'));
mongoose_1.default.set('useCreateIndex', true);
var PORT = process.env.PORT || 7000;
mongoose_1.default
    .connect(process.env.MONGO, {
    useNewUrlParser: true
})
    .then(function () {
    app.listen(PORT, function () {
        console.log("Listening on " + PORT);
    });
})
    .catch(function (e) {
    console.error("error to trying connected to mongodb " + e);
});
routes_1.default(app);
