import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const fileFilter = (req: any, file: any, cb: any) => {

  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb (null, true);
  } else {
    cb(null, false);
  }

  
}

export default {
  directory: uploadFolder,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
}