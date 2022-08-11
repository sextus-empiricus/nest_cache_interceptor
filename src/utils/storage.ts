import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import * as mime from 'mime';

export const multerStorage = (dest: string) => {
   return diskStorage({
      destination: (req, file, cb) => cb(null, dest),
      filename: (req, file, cb) =>
         cb(null, `${uuid()}.${(mime as any).getExtension(file.mimetype)}`),
   });
};
