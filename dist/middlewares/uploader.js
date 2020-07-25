"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// SET STORAGE
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var uploadPath = path_1.default.join(__dirname, '/../../', '/public/uploads');
        if (!fs_1.default.existsSync(uploadPath)) {
            console.log('folder not exists');
            fs_1.default.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        var fileName = "" + Date.now() + path_1.default.extname(file.originalname);
        req.filePath = "/uploads/" + fileName;
        cb(null, fileName);
    }
});
var upload = multer_1.default({ storage: storage });
exports.default = upload;
