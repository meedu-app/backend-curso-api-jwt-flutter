import multer from 'multer';
import fs from 'fs';
import path from 'path';

// SET STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '/../../', '/public/uploads');
    if (!fs.existsSync(uploadPath)) {
      console.log('folder not exists');
      fs.mkdirSync(uploadPath, { recursive: true });
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
