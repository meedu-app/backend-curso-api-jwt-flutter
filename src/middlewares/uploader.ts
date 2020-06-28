import multer from 'multer';
import fs from 'fs';
import path from 'path';

// SET STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(__dirname + '/../../public/uploads')) {
      console.log('folder not exists');
      fs.mkdirSync(__dirname + '/../../public/uploads', { recursive: true });
    }
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    req.filePath = `/uploads/${fileName}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });
export default upload;
