"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth = __importStar(require("../controllers/auth"));
var profile = __importStar(require("../controllers/profile"));
var tokens_1 = __importDefault(require("../controllers/tokens"));
var isLogin_1 = require("../middlewares/isLogin");
var uploader_1 = __importDefault(require("../middlewares/uploader"));
var EXPIRES_IN = 60 * 60; // 1 hour
exports.default = (function (app) {
    app.get('/', function (req, res) {
        res.send('meedu.app 😎');
    });
    app.post('/api/v1/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var response, payload, token, e_1, duplicatedValues;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, auth.register(req.body)];
                case 1:
                    response = _a.sent();
                    payload = { id: response._id };
                    return [4 /*yield*/, jsonwebtoken_1.default.sign(payload, process.env.SECRET, {
                            expiresIn: EXPIRES_IN
                        })];
                case 2:
                    token = _a.sent();
                    // console.log('data', payload);
                    return [4 /*yield*/, tokens_1.default.newRefreshToken(token, payload)];
                case 3:
                    // console.log('data', payload);
                    _a.sent();
                    res.status(200).send({
                        token: token,
                        expiresIn: EXPIRES_IN
                    });
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log(e_1);
                    if (e_1.errors) {
                        duplicatedValues = [];
                        if (e_1.errors.email) {
                            duplicatedValues.push('email');
                        }
                        if (e_1.errors.username) {
                            duplicatedValues.push('username');
                        }
                        res
                            .status(409)
                            .send({ message: e_1.message, duplicatedFields: duplicatedValues });
                        return [2 /*return*/];
                    }
                    res.status(500).send({ message: e_1.message });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    app.post('/api/v1/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var response, payload, token, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, auth.login(req.body)];
                case 1:
                    response = _a.sent();
                    payload = { id: response._id };
                    return [4 /*yield*/, jsonwebtoken_1.default.sign(payload, process.env.SECRET, {
                            expiresIn: EXPIRES_IN
                        })];
                case 2:
                    token = _a.sent();
                    return [4 /*yield*/, tokens_1.default.newRefreshToken(token, payload)];
                case 3:
                    _a.sent();
                    res.status(200).send({
                        token: token,
                        expiresIn: EXPIRES_IN
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.status(error_1.code || 403).send({ message: error_1.message });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    app.get('/api/v1/user-info', isLogin_1.isLogin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log('userId', req.userId);
                    return [4 /*yield*/, profile.info(req.userId)];
                case 1:
                    response = _a.sent();
                    res.status(200).send(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).send({ message: error_2.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.post('/api/v1/update-avatar', isLogin_1.isLogin, uploader_1.default.single('attachment'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var file, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    file = req.file;
                    if (!file) {
                        throw new Error('Please upload a file');
                    }
                    return [4 /*yield*/, profile.avatar(req.userId, req.filePath)];
                case 1:
                    _a.sent();
                    res.status(200).send(req.filePath);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    res.status(500).send({ message: error_3.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // create a new jwt token for an especific user by Id
    app.post('/api/v1/refresh-token', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var token, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = req.headers.token;
                    return [4 /*yield*/, tokens_1.default.refresh(token)];
                case 1:
                    data = _a.sent();
                    if (!data)
                        throw new Error('invalid refreshToken');
                    console.log('token refrescado');
                    res.status(200).send(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log('error refresh-token', error_4);
                    if (error_4.message === '403') {
                        res.status(403).send({ message: 'invalid token' });
                    }
                    else {
                        res.status(403).send({ message: error_4.message });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
